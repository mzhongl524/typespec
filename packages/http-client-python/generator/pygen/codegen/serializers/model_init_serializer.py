# -------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See License.txt in the project root for
# license information.
# --------------------------------------------------------------------------
from typing import List
from jinja2 import Environment
from ..models import CodeModel, ModelType, EnumType


class ModelInitSerializer:
    def __init__(
        self, code_model: CodeModel, env: Environment, *, models: List[ModelType], enums: List[EnumType]
    ) -> None:
        self.code_model = code_model
        self.env = env
        self.models = models
        self.enums = enums

    def serialize(self) -> str:
        schemas = [s.name for s in self.code_model.get_public_model_types(self.models)]
        schemas.sort()
        enums = [e.name for e in self.enums if not e.internal] if self.enums else None

        if enums:
            enums.sort()

            # check to see if we have any duplicate names between enum and object schemas
            model_enum_name_intersection = set(schemas).intersection(set(enums))
            if model_enum_name_intersection:
                raise ValueError(
                    "We have models and enums sharing the following names: {}".format(
                        ", ".join(model_enum_name_intersection)
                    )
                )

        template = self.env.get_template("model_init.py.jinja2")
        return template.render(code_model=self.code_model, schemas=schemas, enums=enums)
