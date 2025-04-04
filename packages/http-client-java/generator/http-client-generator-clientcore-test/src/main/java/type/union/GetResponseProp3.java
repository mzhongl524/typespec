package type.union;

import io.clientcore.core.annotations.Metadata;
import io.clientcore.core.serialization.json.JsonReader;
import io.clientcore.core.serialization.json.JsonSerializable;
import io.clientcore.core.serialization.json.JsonToken;
import io.clientcore.core.serialization.json.JsonWriter;
import io.clientcore.core.utils.ExpandableEnum;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

/**
 * Defines values for GetResponseProp3.
 */
public final class GetResponseProp3 implements ExpandableEnum<String>, JsonSerializable<GetResponseProp3> {
    private static final Map<String, GetResponseProp3> VALUES = new ConcurrentHashMap<>();

    private static final Function<String, GetResponseProp3> NEW_INSTANCE = GetResponseProp3::new;

    /**
     * Static value b for GetResponseProp3.
     */
    @Metadata(generated = true)
    public static final GetResponseProp3 B = fromValue("b");

    /**
     * Static value c for GetResponseProp3.
     */
    @Metadata(generated = true)
    public static final GetResponseProp3 C = fromValue("c");

    private final String value;

    private GetResponseProp3(String value) {
        this.value = value;
    }

    /**
     * Creates or finds a GetResponseProp3.
     * 
     * @param value a value to look for.
     * @return the corresponding GetResponseProp3.
     * @throws IllegalArgumentException if value is null.
     */
    @Metadata(generated = true)
    public static GetResponseProp3 fromValue(String value) {
        if (value == null) {
            throw new IllegalArgumentException("'value' cannot be null.");
        }
        return VALUES.computeIfAbsent(value, NEW_INSTANCE);
    }

    /**
     * Gets known GetResponseProp3 values.
     * 
     * @return Known GetResponseProp3 values.
     */
    @Metadata(generated = true)
    public static Collection<GetResponseProp3> values() {
        return new ArrayList<>(VALUES.values());
    }

    /**
     * Gets the value of the GetResponseProp3 instance.
     * 
     * @return the value of the GetResponseProp3 instance.
     */
    @Metadata(generated = true)
    @Override
    public String getValue() {
        return this.value;
    }

    /**
     * {@inheritDoc}
     */
    @Metadata(generated = true)
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        return jsonWriter.writeString(getValue());
    }

    /**
     * Reads an instance of GetResponseProp3 from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of GetResponseProp3 if the JsonReader was pointing to an instance of it, or null if the
     * JsonReader was pointing to JSON null.
     * @throws IOException If an error occurs while reading the GetResponseProp3.
     * @throws IllegalStateException If unexpected JSON token is found.
     */
    @Metadata(generated = true)
    public static GetResponseProp3 fromJson(JsonReader jsonReader) throws IOException {
        JsonToken nextToken = jsonReader.nextToken();
        if (nextToken == JsonToken.NULL) {
            return null;
        }
        if (nextToken != JsonToken.STRING) {
            throw new IllegalStateException(
                String.format("Unexpected JSON token for %s deserialization: %s", JsonToken.STRING, nextToken));
        }
        return GetResponseProp3.fromValue(jsonReader.getString());
    }

    @Metadata(generated = true)
    @Override
    public String toString() {
        return Objects.toString(this.value);
    }

    @Metadata(generated = true)
    @Override
    public boolean equals(Object obj) {
        return this == obj;
    }

    @Metadata(generated = true)
    @Override
    public int hashCode() {
        return Objects.hashCode(this.value);
    }
}
