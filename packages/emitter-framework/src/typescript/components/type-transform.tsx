import { type Children, code, For, mapJoin, type Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import type {
  Discriminator,
  Model,
  ModelProperty,
  RekeyableMap,
  Scalar,
  Type,
  Union,
} from "@typespec/compiler";
import type { Typekit } from "@typespec/compiler/typekit";
import { createRekeyableMap } from "@typespec/compiler/utils";
import { useTsp } from "../../core/context/tsp-context.js";
import { reportDiagnostic } from "../../lib.js";
import { reportTypescriptDiagnostic } from "../../typescript/lib.js";
import { efRefkey } from "../utils/refkey.js";
import {
  ArraySerializerRefkey,
  DateDeserializerRefkey,
  DateRfc3339SerializerRefkey,
  RecordSerializerRefkey,
} from "./static-serializers.jsx";

export interface TypeTransformProps {
  name?: string;
  type: Type;
  target: "application" | "transport";
  refkey?: Refkey;
}

export interface UnionTransformProps {
  name?: string;
  type: Union;
  target: "application" | "transport";
}
function UnionTransformExpression(props: UnionTransformProps) {
  const { $ } = useTsp();
  const discriminator = $.union.getDiscriminatedUnion(props.type);
  const discriminatorProperty = discriminator?.options.discriminatorPropertyName && {
    propertyName: discriminator.options.discriminatorPropertyName,
  };

  if (!discriminatorProperty) {
    // TODO: Handle non-discriminated unions
    reportTypescriptDiagnostic($.program, {
      code: "typescript-unsupported-nondiscriminated-union",
      target: props.type,
    });
    return null;
  }

  return (
    <DiscriminateExpression
      type={props.type}
      discriminator={discriminatorProperty}
      target={props.target}
    />
  );
}

interface DiscriminateExpressionProps {
  type: Union | Model;
  discriminator: Discriminator;
  target: "application" | "transport";
}

function DiscriminateExpression(props: DiscriminateExpressionProps) {
  const { $ } = useTsp();
  const discriminatedUnion = $.model.is(props.type)
    ? $.model.getDiscriminatedUnion(props.type)
    : $.union.getDiscriminatedUnion(props.type);

  if (!discriminatedUnion) {
    return code`return item as any`;
  }

  const discriminatorRef = `item.${props.discriminator.propertyName}`;

  const unhandledVariant = `
  \n\nconsole.warn(\`Received unknown kind: \${${discriminatorRef}}\`); 
  return item as any;
  `;

  const variants: Map<string, Type> = discriminatedUnion.variants;

  return (
    <For each={variants} ender={unhandledVariant}>
      {(name, variant) => {
        return code`
      if( ${discriminatorRef} === ${JSON.stringify(name)}) {
        return ${(<TypeTransformCall type={variant} target={props.target} castInput itemPath={["item"]} />)}
      }`;
      }}
    </For>
  );
}

/**
 * Component that represents a function declaration that transforms a model to a transport or application model.
 */
export function TypeTransformDeclaration(props: TypeTransformProps) {
  const { $ } = useTsp();
  const namePolicy = ts.useTSNamePolicy();

  // Record and array have their general serializers
  if ($.array.is(props.type) || $.record.is(props.type)) {
    return null;
  }

  // TODO: Handle other type of declarations
  if (!$.model.is(props.type) && !$.union.is(props.type)) {
    return null;
  }

  const originalName = props.name ?? props.type.name;

  if (!originalName || originalName === "") {
    reportDiagnostic($.program, {
      code: "type-declaration-missing-name",
      target: props.type,
    });
  }

  const baseName = namePolicy.getName(originalName!, "function");
  const functionSuffix = props.target === "application" ? "ToApplication" : "ToTransport";
  const functionName = props.name ? props.name : `${baseName}${functionSuffix}`;
  const itemType =
    props.target === "application" ? "any" : <ts.Reference refkey={efRefkey(props.type)} />;

  let transformExpression: Children;
  if ($.model.is(props.type)) {
    const discriminator = $.model.getDiscriminatedUnion(props.type);

    transformExpression = discriminator ? (
      <DiscriminateExpression
        type={props.type}
        discriminator={discriminator}
        target={props.target}
      />
    ) : (
      <>
        return{" "}
        <ModelTransformExpression type={props.type} itemPath={["item"]} target={props.target} />;
      </>
    );
  } else if ($.union.is(props.type)) {
    transformExpression = <UnionTransformExpression type={props.type} target={props.target} />;
  } else {
    reportTypescriptDiagnostic($.program, {
      code: "typescript-unsupported-type-transform",
      target: props.type,
    });
  }

  const returnType = props.target === "application" ? efRefkey(props.type) : "any";

  const ref = props.refkey ?? getTypeTransformerRefkey(props.type, props.target);

  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={ref}
      parameters={[{ name: "item", type: itemType }]}
      returnType={returnType}
    >
      {transformExpression}
    </ts.FunctionDeclaration>
  );
}

/**
 * Gets a refkey for a TypeTransformer function
 * @param type type to be transformed
 * @param target target of the transformation "application" or "transport"
 * @returns the refkey for the TypeTransformer function
 */
export function getTypeTransformerRefkey(type: Type, target: "application" | "transport") {
  return efRefkey(type, target);
}

export interface ModelTransformExpressionProps {
  type: Model;
  itemPath?: string[];
  target: "application" | "transport";
  optionsBagName?: string;
}

/**
 * Component that represents an object expression that transforms a model to a transport or application model.
 */
export function ModelTransformExpression(props: ModelTransformExpressionProps) {
  const { $ } = useTsp();
  if (props.type.baseModel) {
    reportTypescriptDiagnostic($.program, {
      code: "typescript-extended-model-transform-nyi",
      target: props.type,
    });
  }

  if ($.model.getIndexType(props.type)) {
    reportTypescriptDiagnostic($.program, {
      code: "typescript-spread-model-transformation-nyi",
      target: props.type,
    });
  }
  const namePolicy = ts.useTSNamePolicy();
  const modelProperties: RekeyableMap<string, ModelProperty> = createRekeyableMap();

  $.model.getProperties(props.type).forEach((property) => {
    if ($.type.isNever(property.type)) {
      return;
    }

    modelProperties.set(property.name, property);
  });

  let baseModelTransform: Children = null;
  if (props.type.baseModel) {
    baseModelTransform = code`...${(<ModelTransformExpression type={props.type.baseModel} itemPath={props.itemPath} target={props.target} optionsBagName={props.optionsBagName} />)},\n`;
  }

  return (
    <ts.ObjectExpression>
      {baseModelTransform}
      {mapJoin(
        () => modelProperties,
        (_, property) => {
          const unpackedType = $.httpPart.unpack(property.type) ?? property.type;
          let targetPropertyName = property.name;
          let sourcePropertyName = namePolicy.getName(property.name, "interface-member");

          if (props.target === "application") {
            const temp = targetPropertyName;
            targetPropertyName = sourcePropertyName;
            sourcePropertyName = temp;
          }

          const itemPath = [...(props.itemPath ?? []), sourcePropertyName];
          if (property.optional && props.optionsBagName) {
            itemPath.unshift(`${props.optionsBagName}?`);
          }

          let value = (
            <TypeTransformCall target={props.target} type={unpackedType} itemPath={itemPath} />
          );

          if (property.optional && needsTransform($, unpackedType)) {
            value = (
              <>
                {itemPath.join(".")} ?{" "}
                <TypeTransformCall target={props.target} type={unpackedType} itemPath={itemPath} />{" "}
                : {itemPath.join(".")}
              </>
            );
          }

          return <ts.ObjectProperty name={JSON.stringify(targetPropertyName)} value={value} />;
        },
        { joiner: ",\n" },
      )}
    </ts.ObjectExpression>
  );
}

interface TransformReferenceProps {
  type: Type;
  target: "application" | "transport";
}

/**
 * Given a type and target, gets the reference to the transform function
 */
function TransformReference(props: TransformReferenceProps) {
  const { $ } = useTsp();
  if ($.scalar.is(props.type)) {
    return <TransformScalarReference type={props.type} target={props.target} />;
  }

  if ($.model.is(props.type) && $.array.is(props.type)) {
    return code`
  (i: any) => ${(<ts.FunctionCallExpression target={ArraySerializerRefkey} args={["i", <TransformReference target={props.target} type={$.array.getElementType(props.type)} />]} />)}
    `;
  }

  if ($.model.is(props.type) && $.record.is(props.type)) {
    return code`
  (i: any) => ${(<ts.FunctionCallExpression target={RecordSerializerRefkey} args={["i", <TransformReference target={props.target} type={$.record.getElementType(props.type)} />]} />)}
    `;
  }

  if ($.model.is(props.type)) {
    return <ts.Reference refkey={getTypeTransformerRefkey(props.type, props.target)} />;
  }
}

interface TransformScalarReferenceProps {
  type: Scalar;
  target: "application" | "transport";
}

/**
 * Handles scalar transformations
 */
function TransformScalarReference(props: TransformScalarReferenceProps) {
  const { $ } = useTsp();
  let reference: Refkey | undefined;
  if ($.scalar.isUtcDateTime(props.type)) {
    // TODO: Handle encoding, likely to need access to parents to avoid passing the modelProperty
    reference =
      props.target === "application" ? DateDeserializerRefkey : DateRfc3339SerializerRefkey;
  }

  if (reference) {
    return <ts.Reference refkey={reference} />;
  } else {
    return null;
  }
}

export interface TypeTransformCallProps {
  /**
   * TypeSpec type to be transformed
   */
  type: Type;
  /**
   *
   */
  castInput?: boolean;
  /**
   * Transformation target
   */
  target: "application" | "transport";
  /**
   * When type is a model with a single property, collapses the model to the property.
   */
  collapse?: boolean;
  /**
   * Path of the item to be transformed
   */
  itemPath?: string[];
  /**
   * Name of the options bag to be used when transforming optional properties
   */
  optionsBagName?: string;
}

function needsTransform($: Typekit, type: Type): boolean {
  return $.model.is(type) || $.scalar.isUtcDateTime(type);
}

/**
 * This component represents a function call to transform a type
 */
export function TypeTransformCall(props: TypeTransformCallProps): Children {
  const { $ } = useTsp();
  const collapsedProperty = getCollapsedProperty($, props.type, props.collapse ?? false);
  const itemPath = collapsedProperty
    ? [...(props.itemPath ?? []), collapsedProperty.name]
    : (props.itemPath ?? []);
  if (collapsedProperty?.optional) {
    itemPath.unshift(`${props.optionsBagName}?`);
  }
  let itemName: Children = itemPath.join(".");
  if (props.castInput) {
    itemName = code`${itemName} as ${efRefkey(props.type)}`;
  }
  const transformType = collapsedProperty?.type ?? props.type;
  if ($.model.is(transformType) && $.array.is(transformType)) {
    const unpackedElement =
      $.httpPart.unpack($.array.getElementType(transformType)) ??
      $.array.getElementType(transformType);
    return (
      <ts.FunctionCallExpression
        target={ArraySerializerRefkey}
        args={[itemName, <TransformReference target={props.target} type={unpackedElement} />]}
      />
    );
  }

  if ($.model.is(transformType) && $.record.is(transformType)) {
    const unpackedElement =
      $.httpPart.unpack($.record.getElementType(transformType)) ??
      $.record.getElementType(transformType);
    return (
      <ts.FunctionCallExpression
        target={RecordSerializerRefkey}
        args={[itemName, <TransformReference target={props.target} type={unpackedElement} />]}
      />
    );
  }

  if ($.scalar.isUtcDateTime(transformType)) {
    return (
      <ts.FunctionCallExpression
        target={
          props.target === "application" ? DateDeserializerRefkey : DateRfc3339SerializerRefkey
        }
        args={[itemName]}
      />
    );
  }

  if ($.model.is(transformType)) {
    if ($.model.isExpresion(transformType)) {
      const effectiveModel = $.model.getEffectiveModel(transformType);

      return (
        <ModelTransformExpression
          type={effectiveModel}
          itemPath={itemPath}
          target={props.target}
          optionsBagName={props.optionsBagName}
        />
      );
    }
    return (
      <ts.FunctionCallExpression
        target={getTypeTransformerRefkey(transformType, props.target)}
        args={[itemName]}
      />
    );
  }

  return itemName;
}

function getCollapsedProperty(
  $: Typekit,
  model: Type,
  collapse: boolean,
): ModelProperty | undefined {
  if (!$.model.is(model)) {
    return undefined;
  }

  const modelProperties = $.model.getProperties(model);
  if (collapse && modelProperties.size === 1) {
    return Array.from(modelProperties.values())[0];
  }
  return undefined;
}
