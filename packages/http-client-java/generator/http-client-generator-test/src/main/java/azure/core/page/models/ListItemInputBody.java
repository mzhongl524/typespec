// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package azure.core.page.models;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.Immutable;
import com.azure.json.JsonReader;
import com.azure.json.JsonSerializable;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;

/**
 * The body of the input.
 */
@Immutable
public final class ListItemInputBody implements JsonSerializable<ListItemInputBody> {
    /*
     * The name of the input.
     */
    @Generated
    private final String inputName;

    /**
     * Creates an instance of ListItemInputBody class.
     * 
     * @param inputName the inputName value to set.
     */
    @Generated
    public ListItemInputBody(String inputName) {
        this.inputName = inputName;
    }

    /**
     * Get the inputName property: The name of the input.
     * 
     * @return the inputName value.
     */
    @Generated
    public String getInputName() {
        return this.inputName;
    }

    /**
     * {@inheritDoc}
     */
    @Generated
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeStringField("inputName", this.inputName);
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of ListItemInputBody from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of ListItemInputBody if the JsonReader was pointing to an instance of it, or null if it was
     * pointing to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the ListItemInputBody.
     */
    @Generated
    public static ListItemInputBody fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            String inputName = null;
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("inputName".equals(fieldName)) {
                    inputName = reader.getString();
                } else {
                    reader.skipChildren();
                }
            }
            return new ListItemInputBody(inputName);
        });
    }
}
