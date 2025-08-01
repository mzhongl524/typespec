# Change Log - @typespec/http-client-python

## 0.14.0

### Features

- [#7924](https://github.com/microsoft/typespec/pull/7924) Support @override to reorder operation parameters

### Bump dependencies

- [#7924](https://github.com/microsoft/typespec/pull/7924) bump typespec


## 0.13.0

### Features

- [#7817](https://github.com/microsoft/typespec/pull/7817) Make mixin operations classes private to remove from documentation


## 0.12.5

### Bug Fixes

- [#7760](https://github.com/microsoft/typespec/pull/7760) [http-client-python] Add support for uv package manager alongside pip


## 0.12.4

### Bump dependencies

- [#7735](https://github.com/microsoft/typespec/pull/7735) bump TCGC 0.57.2

### Bug Fixes

- [#7713](https://github.com/microsoft/typespec/pull/7713) Allow discriminators in derived classes that are from a fixed enum class


## 0.12.3

### Bug Fixes

- [#7705](https://github.com/microsoft/typespec/pull/7705) Validate api versions by looking at ordering of api versions from spec
- [#7696](https://github.com/microsoft/typespec/pull/7696) Add support for `validate-versioning` flag, so users can toggle whether they get api versioning validation


## 0.12.2

### Bump dependencies

- [#7667](https://github.com/microsoft/typespec/pull/7667) bump typespec


## 0.12.1

### Bump dependencies

- [#7613](https://github.com/microsoft/typespec/pull/7613) bump typespec


## 0.12.0

### Features

- [#7359](https://github.com/microsoft/typespec/pull/7359) store apiVersion info in `_metadata.json`

### Bug Fixes

- [#7325](https://github.com/microsoft/typespec/pull/7325) Fix response type of paging operations from `Iterable` to `ItemPaged`
- [#7348](https://github.com/microsoft/typespec/pull/7348) Reallow models-only packages


## 0.11.3

### Bump dependencies

- [e56daba](https://github.com/microsoft/typespec/commit/e56daba78a00ce5cec79ded770a512d4dc8df66c) Bump typespec 1.0.0

### Bug Fixes

- [#7119](https://github.com/microsoft/typespec/pull/7119) Fix typing for generic `PipelineClient`
- [#7152](https://github.com/microsoft/typespec/pull/7152) Add support for legacy parameterized next links


## 0.11.2

### Other Changes

- Bump typespec and typespec-azure to latest version


## 0.11.1

### Bug Fixes

- [#6646](https://github.com/microsoft/typespec/pull/6646) Reorder generated `_vendor` file into a `_utils_` folder
- [#7062](https://github.com/microsoft/typespec/pull/7062) Remove warnings thrown if no `package-name` is specified, since this is the default behavior we want


## 0.11.0

### Features

- [#6968](https://github.com/microsoft/typespec/pull/6968) Support parameter promoting to client level and add tests.
- [#6955](https://github.com/microsoft/typespec/pull/6955) Support optional path parameter.

### Bug Fixes

- [#6979](https://github.com/microsoft/typespec/pull/6979) Improve emitter performance by updating black plugin implementation.
- [#7048](https://github.com/microsoft/typespec/pull/7048) Align key in apiview mapping with apiview structure


## 0.10.0

### Features

- [#5925](https://github.com/microsoft/typespec/pull/5925) Improve user experience in multi clouds scenario

### Bug Fixes

- [#7005](https://github.com/microsoft/typespec/pull/7005) Fix docstring type for multi namespaces
- [#7007](https://github.com/microsoft/typespec/pull/7007) Fix for setup.py
- [#6977](https://github.com/microsoft/typespec/pull/6977) add more hooks into setup.py template for users with custom templates


## 0.9.2

### Bug Fixes

- [#6974](https://github.com/microsoft/typespec/pull/6974) Allow `_` in namespaces

### Other Changes

- Drop support for python3.8

## 0.9.1

### Bug Fixes

- [6846](https://github.com/microsoft/typespec/pull/6846) fix license header for legacy SDK

## 0.9.0

### Features

- [#6549](https://github.com/microsoft/typespec/pull/6549) Pass authentication flows info into credential policy for unbranded


## 0.8.2

### Bug Fixes

- [#5649](https://github.com/microsoft/typespec/pull/5649) Always respect namespace from TCGC


## 0.8.1

### Other Changes

- Bump `@typespec/*` 0.67.0

## 0.8.0

### Features

- [#6242](https://github.com/microsoft/typespec/pull/6242) support continuation token for paging


## 0.7.1

### Bug Fixes

- [6579d19](https://github.com/microsoft/typespec/commit/6579d19b4ce852aa62c78b1e1ce871ecd884a554) pass combined types to python generator


## 0.7.0

### Features

- [#5930](https://github.com/microsoft/typespec/pull/5930) Report TCGC diagnostics after create SDK context.

### Bug Fixes

- [#6163](https://github.com/microsoft/typespec/pull/6163) Fix sphinx syntax for raising `DeserializationError` in serialization file
- [#6138](https://github.com/microsoft/typespec/pull/6138) [python] remove useless docstring for models
- [#6104](https://github.com/microsoft/typespec/pull/6104) [python] Don't throw error directly when emitter crash


## 0.6.11

No changes, version bump only.

## 0.6.10

### Bug Fixes

- [#5739](https://github.com/microsoft/typespec/pull/5739) Fix output folder of models when output folder is different with namespace in configuration
- [#5862](https://github.com/microsoft/typespec/pull/5862) Fix crash when value of `--package-pprint-name` contains space
- [#5764](https://github.com/microsoft/typespec/pull/5764) Fix bug in indentation for wrapping a property description that includes a long url
- [#5853](https://github.com/microsoft/typespec/pull/5853) Improve logging by catching expected `ModuleNotFoundError`


## 0.6.9

### Bug Fixes

- Fix output folder of models when output folder is different with namespace in configuration

## 0.6.8

### Bug Fixes

- Fix for scenario that output folder is different with namespace
- Improve XML serialization information in generated models

## 0.6.7

### Bug Fixes

- Fix sphinx typing for raising documentation
- fix typing for class methods in _serialization.py

## 0.6.6

### Other Changes

- Rename `apiview_mapping_python.json` cross-language id file to `apiview-properties.json` for cross-language compatibility
- Order keyword-only args overload first in generated operations

## 0.6.5

### Bug Fixes

- Only add type annotation during initialization for readonly
- Fix pylint issues

### Bump dependencies

- Bump `@typespec/*` 0.64.0 and `@azure-tools/*` 0.50.0

## 0.6.4

### Bug Fixes

- Fix pack issue for typespec namespace
- Fix typing issue for unbranded test case

## 0.6.3

### Bug Fixes

- Only import helpers for serialization if input body is not binary
- Unify descriptions for credentials in documentation

### Other Changes

- Add type annotations for initialized properties in msrest model inits
- Add mypy typing to operation group inits
- Remove Python2 specific datetime logic from internal serialization.

## 0.6.2

### Bug Fixes

- Don't automatically overwrite version in `_version.py` file and `setup.py` file if the existing version is newer

## 0.6.1

### Bug Fixes

- Only add linting disables for a file with too many lines if the file doesn't already disable this linter rule
- Generate `__init__` for internal models to allow for discriminator needs

## 0.6.0

### Features

- Add support for typespec namespace

### Bug Fixes

- Only add linting disables for a file with too many lines if the file doesn't already disable this linter rule

## 0.5.1

### Bug Fixes

- Do not do exception sort if there is no operation groups

## 0.5.0

### Features

- Add support for generation in enviroments without a Python installation

## 0.4.4

### Bug Fixes

- `:code:` in docstring should always be preceded by `\`

## 0.4.3

### Bump dependencies

- Bump `@typespec/*` 0.63.0 and `@azure-tools/*` 0.49.0

## 0.4.2

### Bug Fixes

- Ignore models/enum only used as LRO envelope results
- Refine exception handling logic to keep compatibility for legacy SDK

## 0.4.1

### Bug Fixes

- Ignore models only used as LRO envelope results because we don't do anything with them

## 0.4.0

### Features

- Refine exception handling logic and support exception with ranged status code (#5270)

### Bug Fixes

- Filter out credential that python does not support for now (#5282)

## 0.3.12

### Other Changes

- Fix `useless-object-inheritance` pylint errors

## 0.3.11

### Other Changes

- Pad special property name in model to avoid conflict

### Bug Fixes

- Fix crash if no valid client define in typespec file

## 0.3.10

### Bug Fixes

- Bump pyright and mypy dependencies

## 0.3.9

### Bug Fixes

- Fix quote for string type

## 0.3.8

### Bug Fixes

- Fix access for paging operation and lro

## 0.3.7

### Bug Fixes

- Update dependencies to fix install

## 0.3.6

### Bump dependencies

- Bump `@typespec/*` 0.62.0 and `@azure-tools/*` 0.48.0

## 0.3.5

### Bump dependencies

- Bump TCGC to 0.47.4

## 0.3.4

### Bug Fixes

- Added ignore comment in `__init__.py` to avoid mypy error

## 0.3.3

### Bug Fixes

- Fix pylint issue for useless suppressions

## 0.3.2

### Bug Fixes

- Update generated code so there is no need to run the `postprocess` script when customizations are made #4718

## 0.3.1

### Bug Fixes

- Avoid change original data when deserialize for polymorphic model

## 0.3.0

### Bump dependencies

- Bump dependencies

### Bug Fixes

- Fix CI to make sure generated SDK pass necessary check

## 0.2.0

### Bug Fixes

- Fix lint issues

### Features

- Removed usage for some deprecated function of `@azure-tools/typespec-client-generator-core`

## 0.1.0

### Features

- Initial release
