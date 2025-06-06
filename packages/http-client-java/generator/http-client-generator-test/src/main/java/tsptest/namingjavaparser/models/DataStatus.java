// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.namingjavaparser.models;

import com.azure.core.annotation.Generated;
import com.azure.core.util.ExpandableStringEnum;
import java.util.Collection;

/**
 * summary of Statuses
 * 
 * description of Statuses.
 */
public final class DataStatus extends ExpandableStringEnum<DataStatus> {
    /**
     * Static value Running for DataStatus.
     */
    @Generated
    public static final DataStatus LRO_RUNNING = fromString("Running");

    /**
     * Static value Completed for DataStatus.
     */
    @Generated
    public static final DataStatus COMPLETED = fromString("Completed");

    /**
     * Static value Failed for DataStatus.
     */
    @Generated
    public static final DataStatus FAILED = fromString("Failed");

    /**
     * Creates a new instance of DataStatus value.
     * 
     * @deprecated Use the {@link #fromString(String)} factory method.
     */
    @Generated
    @Deprecated
    public DataStatus() {
    }

    /**
     * Creates or finds a DataStatus from its string representation.
     * 
     * @param name a name to look for.
     * @return the corresponding DataStatus.
     */
    @Generated
    public static DataStatus fromString(String name) {
        return fromString(name, DataStatus.class);
    }

    /**
     * Gets known DataStatus values.
     * 
     * @return known DataStatus values.
     */
    @Generated
    public static Collection<DataStatus> values() {
        return values(DataStatus.class);
    }
}
