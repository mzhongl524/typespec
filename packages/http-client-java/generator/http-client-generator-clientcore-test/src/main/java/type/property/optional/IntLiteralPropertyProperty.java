package type.property.optional;

/**
 * Defines values for IntLiteralPropertyProperty.
 */
public enum IntLiteralPropertyProperty {
    /**
     * Enum value 1.
     */
    ONE(1);

    /**
     * The actual serialized value for a IntLiteralPropertyProperty instance.
     */
    private final int value;

    IntLiteralPropertyProperty(int value) {
        this.value = value;
    }

    /**
     * Parses a serialized value to a IntLiteralPropertyProperty instance.
     * 
     * @param value the serialized value to parse.
     * @return the parsed IntLiteralPropertyProperty object, or null if unable to parse.
     */
    public static IntLiteralPropertyProperty fromInt(int value) {
        IntLiteralPropertyProperty[] items = IntLiteralPropertyProperty.values();
        for (IntLiteralPropertyProperty item : items) {
            if (item.toInt() == value) {
                return item;
            }
        }
        return null;
    }

    /**
     * De-serializes the instance to int value.
     * 
     * @return the int value.
     */
    public int toInt() {
        return this.value;
    }
}
