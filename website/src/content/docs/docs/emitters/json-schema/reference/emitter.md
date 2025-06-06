---
title: "Emitter usage"
---

## Emitter usage

1. Via the command line

```bash
tsp compile . --emit=@typespec/json-schema
```

2. Via the config

```yaml
emit:
  - "@typespec/json-schema"
```

The config can be extended with options as follows:

```yaml
emit:
  - "@typespec/json-schema"
options:
  "@typespec/json-schema":
    option: value
```

## Emitter options

### `emitter-output-dir`

**Type:** `absolutePath`

Defines the emitter output directory. Defaults to `{output-dir}/@typespec/json-schema`
See [Configuring output directory for more info](https://typespec.io/docs/handbook/configuration/configuration/#configuring-output-directory)

### `file-type`

**Type:** `"yaml" | "json"`

Serialize the schema as either yaml or json.

### `int64-strategy`

**Type:** `"string" | "number"`

How to handle 64 bit integers on the wire. Options are:

- string: serialize as a string (widely interoperable)
- number: serialize as a number (not widely interoperable)

### `bundleId`

**Type:** `string`

When provided, bundle all the schemas into a single json schema document with schemas under $defs. The provided id is the id of the root document and is also used for the file name.

### `emitAllModels`

**Type:** `boolean`

When true, emit all model declarations to JSON Schema without requiring the @jsonSchema decorator.

### `emitAllRefs`

**Type:** `boolean`

When true, emit all references as json schema files, even if the referenced type does not have the `@jsonSchema` decorator or is not within a namespace with the `@jsonSchema` decorator.

### `seal-object-schemas`

**Type:** `boolean`

If true, then for models emitted as object schemas we default `unevaluatedProperties` to `{ not: {} }`,
if not explicitly specified elsewhere.
Default: `false`
