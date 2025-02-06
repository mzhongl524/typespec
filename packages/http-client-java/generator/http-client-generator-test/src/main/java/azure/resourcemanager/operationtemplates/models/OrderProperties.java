// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package azure.resourcemanager.operationtemplates.models;

import com.azure.core.annotation.Fluent;
import com.azure.core.util.logging.ClientLogger;
import com.azure.json.JsonReader;
import com.azure.json.JsonSerializable;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;

/**
 * The OrderProperties model.
 */
@Fluent
public final class OrderProperties implements JsonSerializable<OrderProperties> {
    /*
     * The product ID of the order.
     */
    private String productId;

    /*
     * Amount of the product.
     */
    private int amount;

    /*
     * The provisioning state of the product.
     */
    private String provisioningState;

    /**
     * Creates an instance of OrderProperties class.
     */
    public OrderProperties() {
    }

    /**
     * Get the productId property: The product ID of the order.
     * 
     * @return the productId value.
     */
    public String productId() {
        return this.productId;
    }

    /**
     * Set the productId property: The product ID of the order.
     * 
     * @param productId the productId value to set.
     * @return the OrderProperties object itself.
     */
    public OrderProperties withProductId(String productId) {
        this.productId = productId;
        return this;
    }

    /**
     * Get the amount property: Amount of the product.
     * 
     * @return the amount value.
     */
    public int amount() {
        return this.amount;
    }

    /**
     * Set the amount property: Amount of the product.
     * 
     * @param amount the amount value to set.
     * @return the OrderProperties object itself.
     */
    public OrderProperties withAmount(int amount) {
        this.amount = amount;
        return this;
    }

    /**
     * Get the provisioningState property: The provisioning state of the product.
     * 
     * @return the provisioningState value.
     */
    public String provisioningState() {
        return this.provisioningState;
    }

    /**
     * Validates the instance.
     * 
     * @throws IllegalArgumentException thrown if the instance is not valid.
     */
    public void validate() {
        if (productId() == null) {
            throw LOGGER.atError()
                .log(new IllegalArgumentException("Missing required property productId in model OrderProperties"));
        }
    }

    private static final ClientLogger LOGGER = new ClientLogger(OrderProperties.class);

    /**
     * {@inheritDoc}
     */
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeStringField("productId", this.productId);
        jsonWriter.writeIntField("amount", this.amount);
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of OrderProperties from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of OrderProperties if the JsonReader was pointing to an instance of it, or null if it was
     * pointing to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the OrderProperties.
     */
    public static OrderProperties fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            OrderProperties deserializedOrderProperties = new OrderProperties();
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("productId".equals(fieldName)) {
                    deserializedOrderProperties.productId = reader.getString();
                } else if ("amount".equals(fieldName)) {
                    deserializedOrderProperties.amount = reader.getInt();
                } else if ("provisioningState".equals(fieldName)) {
                    deserializedOrderProperties.provisioningState = reader.getString();
                } else {
                    reader.skipChildren();
                }
            }

            return deserializedOrderProperties;
        });
    }
}
