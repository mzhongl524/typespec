import { DiagnosticTarget } from "@typespec/compiler";
import { expectDiagnostics } from "@typespec/compiler/testing";
import { deepStrictEqual, ok, strictEqual } from "assert";
import { describe, expect, it } from "vitest";
import { worksFor } from "./works-for.js";

worksFor(["3.0.0", "3.1.0"], ({ diagnoseOpenApiFor, oapiForModel, openApiFor }) => {
  it("defines models", async () => {
    const res = await oapiForModel(
      "Foo",
      `model Foo {
        x: int32;
      };`,
    );

    ok(res.isRef);
    deepStrictEqual(res.schemas.Foo, {
      type: "object",
      properties: {
        x: { type: "integer", format: "int32" },
      },
      required: ["x"],
    });
  });

  it("uses json name specified via @encodedName", async () => {
    const res = await oapiForModel(
      "Foo",
      `model Foo {
        @encodedName("application/json", "xJson")
        x: int32;
      };`,
    );

    expect(res.schemas.Foo).toMatchObject({
      required: ["xJson"],
      properties: {
        xJson: { type: "integer", format: "int32" },
      },
    });
  });

  it("errors on duplicate model names", async () => {
    const diagnostics = await diagnoseOpenApiFor(
      `
      model P {
        propA: string;
      }

      @friendlyName("P")
      model Q {
        propB: string;
      }

      @route("/test1")
      @get
      op test1(p: P): Q;
      `,
    );

    expectDiagnostics(diagnostics, [
      {
        code: "@typespec/openapi/duplicate-type-name",
        message: /type/,
      },
    ]);
  });

  describe("errors on invalid model names", () => {
    const symbols = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "=",
      "+",
      "[",
      "]",
      "{",
      "}",
      "|",
      ";",
      ":",
      "<",
      ">",
      ",",
      "/",
      "?",
      "~",
    ];
    it.each(symbols)("%sName01", async (model) => {
      const diagnostics = await diagnoseOpenApiFor(
        `
        model \`${model}Name01\` { name: string; }
       `,
      );
      expectDiagnostics(diagnostics, [
        {
          code: "@typespec/openapi3/invalid-component-fixed-field-key",
        },
      ]);
      diagnostics.forEach((d) => {
        const diagnosticTarget = d.target as DiagnosticTarget;
        strictEqual(
          diagnosticTarget && "kind" in diagnosticTarget && diagnosticTarget.kind === "Model",
          true,
        );
      });
    });
  });

  describe("no errors on valid model names", () => {
    const symbols = [".", "-", "_"];
    it.each(symbols)("%sName01", async (model) => {
      const diagnostics = await diagnoseOpenApiFor(
        `
        model \`${model}Name01\` { name: string; }
       `,
      );
      expectDiagnostics(diagnostics, []);
    });
  });

  it("doesn't define anonymous models", async () => {
    const res = await oapiForModel("{ x: int32 }", "");

    ok(!res.isRef);
    strictEqual(Object.keys(res.schemas).length, 0);
    deepStrictEqual(res.useSchema, {
      type: "object",
      properties: {
        x: { type: "integer", format: "int32" },
      },
      required: ["x"],
    });
  });

  it("defines templated models", async () => {
    const res = await oapiForModel(
      "Foo<int32>",
      `model Foo<T> {
        x: T;
      };`,
    );

    ok(!res.isRef);
    deepStrictEqual(res.useSchema, {
      type: "object",
      properties: {
        x: { type: "integer", format: "int32" },
      },
      required: ["x"],
    });
  });

  it("defines templated models when template param is in a namespace", async () => {
    const res = await oapiForModel(
      "Foo<Test.M>",
      `
      namespace Test {
        model M {}
      }
      model Foo<T> {
        x: T;
      };`,
    );

    ok(!res.isRef);
    deepStrictEqual(res.useSchema, {
      type: "object",
      properties: {
        x: { $ref: "#/components/schemas/Test.M" },
      },
      required: ["x"],
    });
  });

  it("defines models extended from models", async () => {
    const res = await oapiForModel(
      "Bar",
      `
      model Foo {
        y: int32;
      };
      model Bar extends Foo {}`,
    );

    ok(res.isRef);
    ok(res.schemas.Foo, "expected definition named Foo");
    ok(res.schemas.Bar, "expected definition named Bar");
    deepStrictEqual(res.schemas.Bar, {
      type: "object",
      allOf: [{ $ref: "#/components/schemas/Foo" }],
    });

    deepStrictEqual(res.schemas.Foo, {
      type: "object",
      properties: { y: { type: "integer", format: "int32" } },
      required: ["y"],
    });
  });

  it("specify default value on enum property", async () => {
    const res = await oapiForModel(
      "Foo",
      `
      model Foo {
        optionalEnum?: MyEnum = MyEnum.a;
      };
      
      enum MyEnum {
        a: "a-value",
        b,
      }
      `,
    );

    ok(res.isRef);
    ok(res.schemas.Foo, "expected definition named Foo");
    ok(res.schemas.MyEnum, "expected definition named MyEnum");
    deepStrictEqual(res.schemas.Foo, {
      type: "object",
      properties: {
        optionalEnum: {
          allOf: [{ $ref: "#/components/schemas/MyEnum" }],
          default: "a-value",
        },
      },
    });
  });

  it("specify default value on union with variant", async () => {
    const res = await oapiForModel(
      "Foo",
      `
      model Foo {
        optionalUnion?: MyUnion = MyUnion.a;
      };
      
      union MyUnion {
        a: "a-value",
        b: "b-value",
      }
      `,
    );

    deepStrictEqual(res.schemas.Foo, {
      type: "object",
      properties: {
        optionalUnion: {
          allOf: [{ $ref: "#/components/schemas/MyUnion" }],
          default: "a-value",
        },
      },
    });
  });

  it("scalar used as a default value", async () => {
    const res = await oapiForModel(
      "Pet",
      `
        scalar shortName { init name(value: string);}

        model Pet { name: shortName = shortName.name("Shorty"); }
      `,
    );

    expect(res.schemas.Pet.properties.name.default).toEqual("Shorty");
  });

  it("encode know scalar as a default value", async () => {
    const res = await oapiForModel(
      "Test",
      `
        model Test { @encode("rfc7231") minDate: utcDateTime = utcDateTime.fromISO("2024-01-01T11:32:00Z"); }
      `,
    );

    expect(res.schemas.Test.properties.minDate.default).toEqual("Mon, 01 Jan 2024 11:32:00 GMT");
  });

  it("object value used as a default value", async () => {
    const res = await oapiForModel(
      "Test",
      `
        model Test { Pet: {name: string;} = #{ name: "Dog"}; }
      `,
    );

    expect(res.schemas.Test.properties.Pet.default.name).toEqual("Dog");
  });

  describe("numeric defaults", () => {
    it.each([
      ["0.01", 0.01],
      ["1e-2", 0.01],
    ])("%s => %s", async (value, expected) => {
      const res = await openApiFor(
        `
      model Foo {
        opt?: float = ${value};
      };
      `,
      );

      expect(res.components.schemas.Foo.properties.opt.default).toEqual(expected);
    });
  });

  it("emits models extended from models when parent is emitted", async () => {
    const res = await openApiFor(
      `
      model Parent {
        x?: int32;
      };
      model Child extends Parent {
        y?: int32;
      }
      @route("/") op test(): Parent;
      `,
    );
    deepStrictEqual(res.components.schemas.Parent, {
      type: "object",
      properties: { x: { type: "integer", format: "int32" } },
    });
    deepStrictEqual(res.components.schemas.Child, {
      type: "object",
      allOf: [{ $ref: "#/components/schemas/Parent" }],
      properties: { y: { type: "integer", format: "int32" } },
    });
  });

  it("ignore uninstantiated template types", async () => {
    const res = await openApiFor(
      `
      model Parent {
        x?: int32;
      };
      @friendlyName("TParent_{name}", T)
      model TParent<T> extends Parent {
        t: T;
      }
      model Child extends TParent<string> {
        y?: int32;
      }
      @route("/") op test(): Parent;
      `,
    );
    ok(
      !("TParent" in res.components.schemas),
      "Parent templated type shouldn't be included in OpenAPI",
    );
    deepStrictEqual(res.components.schemas.Parent, {
      type: "object",
      properties: { x: { type: "integer", format: "int32" } },
    });
    deepStrictEqual(res.components.schemas.TParent_string, {
      type: "object",
      properties: { t: { type: "string" } },
      required: ["t"],
      allOf: [{ $ref: "#/components/schemas/Parent" }],
    });
    deepStrictEqual(res.components.schemas.Child, {
      type: "object",
      allOf: [{ $ref: "#/components/schemas/TParent_string" }],
      properties: { y: { type: "integer", format: "int32" } },
    });
  });

  it("shouldn't emit instantiated template child types that are only used in is", async () => {
    const res = await openApiFor(
      `
      model Parent {
        x?: int32;
      };
      model TParent<T> extends Parent {
        t: T;
      }
      model Child is TParent<string> {
        y?: int32;
      }
      @route("/") op test(): Parent;
      `,
    );
    ok(
      !("TParent_string" in res.components.schemas),
      "Parent instantiated templated type shouldn't be included in OpenAPI",
    );
  });

  it("defines models with properties extended from models", async () => {
    const res = await oapiForModel(
      "Bar",
      `
      model Foo {
        y: int32;
      };
      model Bar extends Foo {
        x: int32;
      }`,
    );

    ok(res.isRef);
    ok(res.schemas.Foo, "expected definition named Foo");
    ok(res.schemas.Bar, "expected definition named Bar");
    deepStrictEqual(res.schemas.Bar, {
      type: "object",
      properties: { x: { type: "integer", format: "int32" } },
      allOf: [{ $ref: "#/components/schemas/Foo" }],
      required: ["x"],
    });

    deepStrictEqual(res.schemas.Foo, {
      type: "object",
      properties: { y: { type: "integer", format: "int32" } },
      required: ["y"],
    });
  });

  it("defines models extended from templated models", async () => {
    const res = await oapiForModel(
      "Bar",
      `
      model Foo<T> {
        y: T;
      };
      model Bar extends Foo<int32> {}`,
    );

    ok(res.isRef);
    ok(res.schemas["Foo_int32"] === undefined, "no definition named Foo_int32");
    ok(res.schemas.Bar, "expected definition named Bar");
    deepStrictEqual(res.schemas.Bar, {
      type: "object",
      allOf: [
        {
          type: "object",
          properties: { y: { type: "integer", format: "int32" } },
          required: ["y"],
        },
      ],
    });
  });

  it("defines models with properties extended from templated models", async () => {
    const res = await oapiForModel(
      "Bar",
      `
      @friendlyName("Foo_{name}", T)
      model Foo<T> {
        y: T;
      };
      model Bar extends Foo<int32> {
        x: int32
      }`,
    );

    ok(res.isRef);
    ok(res.schemas.Foo_int32, "expected definition named Foo_int32");
    ok(res.schemas.Bar, "expected definition named Bar");
    deepStrictEqual(res.schemas.Bar, {
      type: "object",
      properties: { x: { type: "integer", format: "int32" } },
      allOf: [{ $ref: "#/components/schemas/Foo_int32" }],
      required: ["x"],
    });

    deepStrictEqual(res.schemas.Foo_int32, {
      type: "object",
      properties: { y: { type: "integer", format: "int32" } },
      required: ["y"],
    });
  });

  it("defines templated models with properties extended from templated models", async () => {
    const res = await oapiForModel(
      "Bar<int32>",
      `
      model Foo<T> {
        y: T;
      };
      model Bar<T> extends Foo<T> {
        x: T
      }`,
    );

    ok(!res.isRef);
    deepStrictEqual(res.useSchema, {
      type: "object",
      properties: {
        x: { type: "integer", format: "int32" },
      },
      required: ["x"],
      allOf: [
        {
          type: "object",
          properties: {
            y: { type: "integer", format: "int32" },
          },
          required: ["y"],
        },
      ],
    });
  });

  it("defines models with no properties extended", async () => {
    const res = await oapiForModel(
      "Bar",
      `
      model Foo {};
      model Bar extends Foo {};`,
    );

    ok(res.isRef);
    ok(res.schemas.Foo, "expected definition named Foo");
    ok(res.schemas.Bar, "expected definition named Bar");
    deepStrictEqual(res.schemas.Bar, {
      type: "object",
      allOf: [{ $ref: "#/components/schemas/Foo" }],
    });

    deepStrictEqual(res.schemas.Foo, {
      type: "object",
    });
  });

  it("defines models with no properties extended twice", async () => {
    const res = await oapiForModel(
      "Baz",
      `
      model Foo { x: int32 };
      model Bar extends Foo {};
      model Baz extends Bar {};`,
    );

    ok(res.isRef);
    ok(res.schemas.Foo, "expected definition named Foo");
    ok(res.schemas.Bar, "expected definition named Bar");
    ok(res.schemas.Baz, "expected definition named Baz");
    deepStrictEqual(res.schemas.Baz, {
      type: "object",
      allOf: [{ $ref: "#/components/schemas/Bar" }],
    });

    deepStrictEqual(res.schemas.Bar, {
      type: "object",
      allOf: [{ $ref: "#/components/schemas/Foo" }],
    });

    deepStrictEqual(res.schemas.Foo, {
      type: "object",
      properties: {
        x: {
          format: "int32",
          type: "integer",
        },
      },
      required: ["x"],
    });
  });

  it("defines enum types", async () => {
    const res = await oapiForModel(
      "Pet",
      `
      enum PetType {
        Dog, Cat
      }
      model Pet { type: PetType };
      `,
    );
    ok(res.isRef);
    strictEqual(res.schemas.Pet.properties.type.$ref, "#/components/schemas/PetType");
    deepStrictEqual(res.schemas.PetType.enum, ["Dog", "Cat"]);
  });

  it("defines enum types with custom values", async () => {
    const res = await oapiForModel(
      "Pet",
      `
      enum PetType {
        Dog: 0, Cat: 1
      }
      model Pet { type: PetType };
      `,
    );
    ok(res.isRef);
    strictEqual(res.schemas.Pet.properties.type.$ref, "#/components/schemas/PetType");
    deepStrictEqual(res.schemas.PetType.enum, [0, 1]);
  });

  it("defines request bodies as unions of models", async () => {
    const openApi = await openApiFor(`
      model Cat {
        meow: int32;
      }
      model Dog {
        bark: string;
      }
      @post op create(@body body: Cat | Dog): { ...Response<200> };
      `);
    ok(openApi.components.schemas.Cat, "expected definition named Cat");
    ok(openApi.components.schemas.Dog, "expected definition named Dog");
    deepStrictEqual(openApi.paths["/"].post.requestBody.content["application/json"].schema, {
      anyOf: [{ $ref: "#/components/schemas/Cat" }, { $ref: "#/components/schemas/Dog" }],
    });
  });

  it("defines request bodies as unions of model and non-model types", async () => {
    const openApi = await openApiFor(`
      model Cat {
        meow: int32;
      }
      
      @post op create(@body body: Cat | string): { ...Response<200> };
      `);
    ok(openApi.components.schemas.Cat, "expected definition named Cat");
    deepStrictEqual(openApi.paths["/"].post.requestBody.content["application/json"].schema, {
      anyOf: [{ $ref: "#/components/schemas/Cat" }, { type: "string" }],
    });
  });

  it("defines request bodies aliased to a union of models", async () => {
    const openApi = await openApiFor(`
    model Cat {
      meow: int32;
    }
    model Dog {
      bark: string;
    }
    alias Pet = Cat | Dog;
    @post op create(@body body: Pet): { ...Response<200> };
    `);
    ok(openApi.components.schemas.Cat, "expected definition named Cat");
    ok(openApi.components.schemas.Dog, "expected definition named Dog");
    deepStrictEqual(openApi.paths["/"].post.requestBody.content["application/json"].schema, {
      anyOf: [{ $ref: "#/components/schemas/Cat" }, { $ref: "#/components/schemas/Dog" }],
    });
  });

  it("defines response bodies as unions of models", async () => {
    const openApi = await openApiFor(`
      model Cat {
        meow: int32;
      }
      model Dog {
        bark: string;
      }
      
      op read(): { @body body: Cat | Dog };
      `);
    ok(openApi.components.schemas.Cat, "expected definition named Cat");
    ok(openApi.components.schemas.Dog, "expected definition named Dog");
    deepStrictEqual(openApi.paths["/"].get.responses["200"].content["application/json"].schema, {
      anyOf: [{ $ref: "#/components/schemas/Cat" }, { $ref: "#/components/schemas/Dog" }],
    });
  });

  it("defines response bodies as unions of model and non-model types", async () => {
    const openApi = await openApiFor(`
    model Cat {
      meow: int32;
    }
    
    op read(): { @body body: Cat | string };
    `);
    ok(openApi.components.schemas.Cat, "expected definition named Cat");
    deepStrictEqual(openApi.paths["/"].get.responses["200"].content["application/json"].schema, {
      anyOf: [{ $ref: "#/components/schemas/Cat" }, { type: "string" }],
    });
  });

  it("defines response bodies aliased to a union from models", async () => {
    const openApi = await openApiFor(`
      model Cat {
        meow: int32;
      }
      model Dog {
        bark: string;
      }
      alias Pet = Cat | Dog;
      op read(): { @body body: Pet };
      `);
    ok(openApi.components.schemas.Cat, "expected definition named Cat");
    ok(openApi.components.schemas.Dog, "expected definition named Dog");
    deepStrictEqual(openApi.paths["/"].get.responses["200"].content["application/json"].schema, {
      anyOf: [{ $ref: "#/components/schemas/Cat" }, { $ref: "#/components/schemas/Dog" }],
    });
  });

  it("defines response bodies unioned and intersected with OkResponse as unions of models", async () => {
    const openApi = await openApiFor(`
      model Cat {
        meow: int32;
      }
      model Dog {
        bark: string;
      }
      op read(): OkResponse & Body<Cat | Dog>;
      `);
    ok(openApi.components.schemas.Cat, "expected definition named Cat");
    ok(openApi.components.schemas.Dog, "expected definition named Dog");
    deepStrictEqual(openApi.paths["/"].get.responses["200"].content["application/json"].schema, {
      anyOf: [{ $ref: "#/components/schemas/Cat" }, { $ref: "#/components/schemas/Dog" }],
    });
  });

  it("defines unions with named variants similarly to unnamed unions (it ignores variant names)", async () => {
    const openApi = await openApiFor(`
      model Cat {
        meow: int32;
      }
      model Dog {
        bark: string;
      }
      union Pet { cat: Cat, dog: Dog }
      
      op read(): { @body body: Pet };
      `);
    ok(openApi.components.schemas.Cat, "expected definition named Cat");
    ok(openApi.components.schemas.Dog, "expected definition named Dog");
    ok(openApi.components.schemas.Pet, "expected definition named Pet");
    deepStrictEqual(openApi.components.schemas.Pet, {
      anyOf: [{ $ref: "#/components/schemas/Cat" }, { $ref: "#/components/schemas/Dog" }],
    });
    deepStrictEqual(openApi.paths["/"].get.responses["200"].content["application/json"].schema, {
      $ref: "#/components/schemas/Pet",
    });
  });

  it("defines oneOf schema for property of a union with @oneOf decorator", async () => {
    const openApi = await openApiFor(`
        model Foo {
          @oneOf
          bar: string | int32;
        }
      `);
    ok(openApi.components.schemas.Foo, "expected definition named Foo");
    deepStrictEqual(openApi.components.schemas.Foo, {
      type: "object",
      properties: {
        bar: {
          oneOf: [{ type: "string" }, { type: "integer", format: "int32" }],
        },
      },
      required: ["bar"],
    });
  });

  it("defines oneOf schema for unions with @oneOf decorator", async () => {
    const openApi = await openApiFor(`
      model Cat {
        meow: int32;
      }
      model Dog {
        bark: string;
      }
      @oneOf
      union Pet { cat: Cat, dog: Dog }
      op read(): { @body body: Pet };
      `);
    ok(openApi.components.schemas.Cat, "expected definition named Cat");
    ok(openApi.components.schemas.Dog, "expected definition named Dog");
    ok(openApi.components.schemas.Pet, "expected definition named Pet");
    deepStrictEqual(openApi.components.schemas.Pet, {
      oneOf: [{ $ref: "#/components/schemas/Cat" }, { $ref: "#/components/schemas/Dog" }],
    });
    deepStrictEqual(openApi.paths["/"].get.responses["200"].content["application/json"].schema, {
      $ref: "#/components/schemas/Pet",
    });
  });

  it("recovers logical type name", async () => {
    const oapi = await openApiFor(
      `
      model Input {
        name?: string;
      }

      model Output {
        text?: string;
      }

      @route("/things/{id}")
      @get
      op get(@path id: string, @query test: string, ...Input): Output & { @header test: string; };
      `,
    );

    deepStrictEqual(oapi.components.schemas.Input, {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
      },
    });

    deepStrictEqual(oapi.components.schemas.Output, {
      type: "object",
      properties: {
        text: {
          type: "string",
        },
      },
    });

    deepStrictEqual(oapi.paths["/things/{id}"].get.requestBody.content["application/json"].schema, {
      $ref: "#/components/schemas/Input",
    });

    deepStrictEqual(
      oapi.paths["/things/{id}"].get.responses["200"].content["application/json"].schema,
      {
        $ref: "#/components/schemas/Output",
      },
    );
  });

  it("detects cycles in inline type", async () => {
    const diagnostics = await diagnoseOpenApiFor(
      `
      model Thing<T> { inner?: Thing<T>; }
      op get(): Thing<string>;
      `,
      { "omit-unreachable-types": true },
    );

    expectDiagnostics(diagnostics, [{ code: "@typespec/openapi3/inline-cycle" }]);
  });

  it("excludes properties with type 'never'", async () => {
    const res = await oapiForModel(
      "Bar",
      `
      model Foo {
        y: int32;
        nope: never;
      };
      model Bar extends Foo {
        x: int32;
      }`,
    );

    ok(res.isRef);
    ok(res.schemas.Foo, "expected definition named Foo");
    ok(res.schemas.Bar, "expected definition named Bar");
    deepStrictEqual(res.schemas.Bar, {
      type: "object",
      properties: { x: { type: "integer", format: "int32" } },
      allOf: [{ $ref: "#/components/schemas/Foo" }],
      required: ["x"],
    });

    deepStrictEqual(res.schemas.Foo, {
      type: "object",
      properties: { y: { type: "integer", format: "int32" } },
      required: ["y"],
    });
  });

  it("supports summary on models and model properties", async () => {
    const res = await oapiForModel(
      "Foo",
      `
      @summary("FooModel")
      model Foo {
        @summary("YProp")
        y: int32;
      };
      `,
    );
    strictEqual(res.schemas.Foo.title, "FooModel");
    strictEqual(res.schemas.Foo.properties.y.title, "YProp");
  });

  describe("referencing another property as type", () => {
    it("use the type of the other property", async () => {
      const res = await oapiForModel(
        "Bar",
        `
        model Foo {
          name: string;
        }
        model Bar {
          x: Foo.name
        }`,
      );

      ok(res.schemas.Bar, "expected definition named Bar");
      deepStrictEqual(res.schemas.Bar.properties.x, {
        type: "string",
      });
    });

    it("use the type of the other property with ref", async () => {
      const res = await oapiForModel(
        "Bar",
        `
        model Name {first: string}
        model Foo {
          name: Name;
        }
        model Bar {
          x: Foo.name
        }`,
      );

      ok(res.schemas.Bar, "expected definition named Bar");
      deepStrictEqual(res.schemas.Bar.properties.x, {
        $ref: "#/components/schemas/Name",
      });
    });

    it("should include decorators on both referenced property and source property itself", async () => {
      const res = await oapiForModel(
        "Bar",
        `
        model Foo {
          @format("uri")
          name: string;
        }
        model Bar {
          @doc("My doc")
          x: Foo.name
        }`,
      );

      ok(res.schemas.Bar, "expected definition named Bar");
      deepStrictEqual(res.schemas.Bar.properties.x, {
        type: "string",
        format: "uri",
        description: "My doc",
      });
    });

    it("decorators on the property should override the value of referenced property", async () => {
      const res = await oapiForModel(
        "Bar",
        `
        model Foo {
          @doc("Default doc")
          name: string;
        }
        model Bar {
          @doc("My doc override")
          x: Foo.name
        }`,
      );

      ok(res.schemas.Bar, "expected definition named Bar");
      deepStrictEqual(res.schemas.Bar.properties.x, {
        type: "string",
        description: "My doc override",
      });
    });
  });

  it("@oneOf decorator can only be used on a union.", async () => {
    const diagnostics = await diagnoseOpenApiFor(
      `
      model Foo {
        @oneOf
        bar: string;
      }
      `,
    );

    expectDiagnostics(diagnostics, {
      code: "@typespec/openapi3/oneof-union",
      message: /type/,
    });
  });

  describe("wraps property $ref in allOf when extra attributes", () => {
    it("with doc", async () => {
      const res = await openApiFor(
        `
        model Foo {
          /** Some doc */ prop: Bar;
        };
        model Bar {}
        `,
      );

      deepStrictEqual(res.components.schemas.Foo.properties.prop, {
        allOf: [{ $ref: "#/components/schemas/Bar" }],
        description: "Some doc",
      });
    });

    it("circular reference", async () => {
      const res = await openApiFor(
        `
        model Foo {
          /** Some doc */ prop: Foo;
        };
        `,
      );

      deepStrictEqual(res.components.schemas.Foo.properties.prop, {
        allOf: [{ $ref: "#/components/schemas/Foo" }],
        description: "Some doc",
      });
    });
  });
});

worksFor(["3.0.0"], ({ oapiForModel }) => {
  it("specify default value on nullable property", async () => {
    const res = await oapiForModel(
      "Foo",
      `
      model Foo {
        optional?: string | null = null;
      };
      `,
    );

    ok(res.schemas.Foo, "expected definition named Foo");
    deepStrictEqual(res.schemas.Foo, {
      type: "object",
      properties: {
        optional: {
          type: "string",
          nullable: true,
          default: null,
        },
      },
    });
  });

  it("defines nullable properties", async () => {
    const res = await oapiForModel(
      "Pet",
      `
      model Pet {
        name: string | null;
      };
      `,
    );
    ok(res.isRef);
    deepStrictEqual(res.schemas.Pet, {
      type: "object",
      properties: {
        name: {
          type: "string",
          nullable: true,
        },
      },
      required: ["name"],
    });
  });

  it("defines nullable array", async () => {
    const res = await oapiForModel(
      "Pet",
      `
      model Pet {
        name: int32[] | null;
      };
      `,
    );
    ok(res.isRef);
    deepStrictEqual(res.schemas.Pet, {
      type: "object",
      properties: {
        name: {
          type: "array",
          items: {
            type: "integer",
            format: "int32",
          },
          nullable: true,
        },
      },
      required: ["name"],
    });
  });
});

worksFor(["3.1.0"], ({ oapiForModel }) => {
  // eslint-disable-next-line vitest/no-identical-title
  it("specify default value on nullable property", async () => {
    const res = await oapiForModel(
      "Foo",
      `
      model Foo {
        optional?: string | null = null;
      };
      `,
    );

    ok(res.schemas.Foo, "expected definition named Foo");
    deepStrictEqual(res.schemas.Foo, {
      type: "object",
      properties: {
        optional: {
          anyOf: [{ type: "string" }, { type: "null" }],
          default: null,
        },
      },
    });
  });

  // eslint-disable-next-line vitest/no-identical-title
  it("defines nullable properties", async () => {
    const res = await oapiForModel(
      "Pet",
      `
      model Pet {
        name: string | null;
      };
      `,
    );
    ok(res.isRef);
    deepStrictEqual(res.schemas.Pet, {
      type: "object",
      properties: {
        name: {
          anyOf: [{ type: "string" }, { type: "null" }],
        },
      },
      required: ["name"],
    });
  });

  // eslint-disable-next-line vitest/no-identical-title
  it("defines nullable array", async () => {
    const res = await oapiForModel(
      "Pet",
      `
      model Pet {
        name: int32[] | null;
      };
      `,
    );
    ok(res.isRef);
    deepStrictEqual(res.schemas.Pet, {
      type: "object",
      properties: {
        name: {
          anyOf: [
            {
              type: "array",
              items: {
                type: "integer",
                format: "int32",
              },
            },
            { type: "null" },
          ],
        },
      },
      required: ["name"],
    });
  });
});
