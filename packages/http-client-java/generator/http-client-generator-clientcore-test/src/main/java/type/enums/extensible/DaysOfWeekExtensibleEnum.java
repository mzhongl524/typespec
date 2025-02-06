// Code generated by Microsoft (R) TypeSpec Code Generator.

package type.enums.extensible;

import io.clientcore.core.annotation.Metadata;
import io.clientcore.core.util.ExpandableEnum;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

/**
 * Days of the week.
 */
public final class DaysOfWeekExtensibleEnum implements ExpandableEnum<String> {
    private static final Map<String, DaysOfWeekExtensibleEnum> VALUES = new ConcurrentHashMap<>();

    private static final Function<String, DaysOfWeekExtensibleEnum> NEW_INSTANCE = DaysOfWeekExtensibleEnum::new;

    /**
     * Monday.
     */
    @Metadata(generated = true)
    public static final DaysOfWeekExtensibleEnum MONDAY = fromValue("Monday");

    /**
     * Tuesday.
     */
    @Metadata(generated = true)
    public static final DaysOfWeekExtensibleEnum TUESDAY = fromValue("Tuesday");

    /**
     * Wednesday.
     */
    @Metadata(generated = true)
    public static final DaysOfWeekExtensibleEnum WEDNESDAY = fromValue("Wednesday");

    /**
     * Thursday.
     */
    @Metadata(generated = true)
    public static final DaysOfWeekExtensibleEnum THURSDAY = fromValue("Thursday");

    /**
     * Friday.
     */
    @Metadata(generated = true)
    public static final DaysOfWeekExtensibleEnum FRIDAY = fromValue("Friday");

    /**
     * Saturday.
     */
    @Metadata(generated = true)
    public static final DaysOfWeekExtensibleEnum SATURDAY = fromValue("Saturday");

    /**
     * Sunday.
     */
    @Metadata(generated = true)
    public static final DaysOfWeekExtensibleEnum SUNDAY = fromValue("Sunday");

    private final String value;

    private DaysOfWeekExtensibleEnum(String value) {
        this.value = value;
    }

    /**
     * Creates or finds a DaysOfWeekExtensibleEnum.
     * 
     * @param value a value to look for.
     * @return the corresponding DaysOfWeekExtensibleEnum.
     * @throws IllegalArgumentException if value is null.
     */
    @Metadata(generated = true)
    public static DaysOfWeekExtensibleEnum fromValue(String value) {
        if (value == null) {
            throw new IllegalArgumentException("'value' cannot be null.");
        }
        return VALUES.computeIfAbsent(value, NEW_INSTANCE);
    }

    /**
     * Gets known DaysOfWeekExtensibleEnum values.
     * 
     * @return Known DaysOfWeekExtensibleEnum values.
     */
    @Metadata(generated = true)
    public static Collection<DaysOfWeekExtensibleEnum> values() {
        return new ArrayList<>(VALUES.values());
    }

    /**
     * Gets the value of the DaysOfWeekExtensibleEnum instance.
     * 
     * @return the value of the DaysOfWeekExtensibleEnum instance.
     */
    @Metadata(generated = true)
    @Override
    public String getValue() {
        return this.value;
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
