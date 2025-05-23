// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package type.property.optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import type.property.optional.models.UnionStringLiteralProperty;
import type.property.optional.models.UnionStringLiteralPropertyProperty;

public class UnionStringLiteralClientTests {
    private final UnionStringLiteralClient client = new OptionalClientBuilder().buildUnionStringLiteralClient();

    @Test
    public void getAll() {
        UnionStringLiteralProperty unionStringLiteralProperty = client.getAll();
        Assertions.assertEquals(UnionStringLiteralPropertyProperty.WORLD, unionStringLiteralProperty.getProperty());
    }

    @Test
    public void getDefault() {
        UnionStringLiteralProperty unionStringLiteralProperty = client.getDefault();
        Assertions.assertNull(unionStringLiteralProperty.getProperty());
    }

    @Test
    public void putAll() {
        UnionStringLiteralProperty unionStringLiteralProperty = new UnionStringLiteralProperty();
        unionStringLiteralProperty.setProperty(UnionStringLiteralPropertyProperty.WORLD);
        client.putAll(unionStringLiteralProperty);
    }

    @Test
    public void putDefault() {
        UnionStringLiteralProperty unionStringLiteralProperty = new UnionStringLiteralProperty();
        client.putDefault(unionStringLiteralProperty);
    }
}
