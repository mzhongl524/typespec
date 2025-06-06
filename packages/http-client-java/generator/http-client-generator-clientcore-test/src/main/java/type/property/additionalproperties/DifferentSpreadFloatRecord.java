package type.property.additionalproperties;

import io.clientcore.core.annotations.Metadata;
import io.clientcore.core.annotations.MetadataProperties;
import io.clientcore.core.serialization.json.JsonReader;
import io.clientcore.core.serialization.json.JsonSerializable;
import io.clientcore.core.serialization.json.JsonToken;
import io.clientcore.core.serialization.json.JsonWriter;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * The model spread Record&lt;float32&gt; with the different known property type.
 */
@Metadata(properties = { MetadataProperties.FLUENT })
public class DifferentSpreadFloatRecord implements JsonSerializable<DifferentSpreadFloatRecord> {
    /*
     * The id property
     */
    @Metadata(properties = { MetadataProperties.GENERATED })
    private final String name;

    /*
     * The model spread Record<float32> with the different known property type
     */
    @Metadata(properties = { MetadataProperties.GENERATED })
    private Map<String, Double> additionalProperties;

    /**
     * Creates an instance of DifferentSpreadFloatRecord class.
     * 
     * @param name the name value to set.
     */
    @Metadata(properties = { MetadataProperties.GENERATED })
    public DifferentSpreadFloatRecord(String name) {
        this.name = name;
    }

    /**
     * Get the name property: The id property.
     * 
     * @return the name value.
     */
    @Metadata(properties = { MetadataProperties.GENERATED })
    public String getName() {
        return this.name;
    }

    /**
     * Get the additionalProperties property: The model spread Record&lt;float32&gt; with the different known property
     * type.
     * 
     * @return the additionalProperties value.
     */
    @Metadata(properties = { MetadataProperties.GENERATED })
    public Map<String, Double> getAdditionalProperties() {
        return this.additionalProperties;
    }

    /**
     * Set the additionalProperties property: The model spread Record&lt;float32&gt; with the different known property
     * type.
     * 
     * @param additionalProperties the additionalProperties value to set.
     * @return the DifferentSpreadFloatRecord object itself.
     */
    @Metadata(properties = { MetadataProperties.GENERATED })
    public DifferentSpreadFloatRecord setAdditionalProperties(Map<String, Double> additionalProperties) {
        this.additionalProperties = additionalProperties;
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Metadata(properties = { MetadataProperties.GENERATED })
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeStringField("name", this.name);
        if (additionalProperties != null) {
            for (Map.Entry<String, Double> additionalProperty : additionalProperties.entrySet()) {
                jsonWriter.writeUntypedField(additionalProperty.getKey(), additionalProperty.getValue());
            }
        }
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of DifferentSpreadFloatRecord from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of DifferentSpreadFloatRecord if the JsonReader was pointing to an instance of it, or null if
     * it was pointing to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the DifferentSpreadFloatRecord.
     */
    @Metadata(properties = { MetadataProperties.GENERATED })
    public static DifferentSpreadFloatRecord fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            String name = null;
            Map<String, Double> additionalProperties = null;
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("name".equals(fieldName)) {
                    name = reader.getString();
                } else {
                    if (additionalProperties == null) {
                        additionalProperties = new LinkedHashMap<>();
                    }

                    additionalProperties.put(fieldName, reader.getDouble());
                }
            }
            DifferentSpreadFloatRecord deserializedDifferentSpreadFloatRecord = new DifferentSpreadFloatRecord(name);
            deserializedDifferentSpreadFloatRecord.additionalProperties = additionalProperties;

            return deserializedDifferentSpreadFloatRecord;
        });
    }
}
