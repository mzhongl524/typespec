// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.flatten;

import com.azure.core.util.ServiceVersion;

/**
 * Service version of FlattenClient.
 */
public enum FlattenServiceVersion implements ServiceVersion {
    /**
     * Enum value 2022-06-01-preview.
     */
    V2022_06_01_PREVIEW("2022-06-01-preview");

    private final String version;

    FlattenServiceVersion(String version) {
        this.version = version;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getVersion() {
        return this.version;
    }

    /**
     * Gets the latest service version supported by this client library.
     * 
     * @return The latest {@link FlattenServiceVersion}.
     */
    public static FlattenServiceVersion getLatest() {
        return V2022_06_01_PREVIEW;
    }
}
