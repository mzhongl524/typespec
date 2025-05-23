// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package type.dictionary;

import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class Float32ValueClientTest {

    private final Float32ValueClient client = new DictionaryClientBuilder().buildFloat32ValueClient();

    @Test
    public void get() {
        Map<String, Double> response = client.get();
        Assertions.assertTrue(response.containsKey("k1"));
        Assertions.assertEquals(43.125, response.get("k1"));
    }

    @Test
    public void put() {
        Map<String, Double> map = new HashMap<>();
        map.put("k1", 43.125);
        client.put(map);
    }
}
