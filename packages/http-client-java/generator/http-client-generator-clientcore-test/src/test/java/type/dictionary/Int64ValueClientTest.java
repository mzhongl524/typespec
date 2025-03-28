// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package type.dictionary;

import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class Int64ValueClientTest {

    private final Int64ValueClient client = new DictionaryClientBuilder().buildInt64ValueClient();

    @Test
    public void get() {
        Map<String, Long> response = client.get();
        Assertions.assertTrue(response.containsKey("k1"));
        Assertions.assertEquals(9007199254740991L, response.get("k1"));
        Assertions.assertTrue(response.containsKey("k2"));
        Assertions.assertEquals(-9007199254740991L, response.get("k2"));
    }

    @Test
    public void put() {
        Map<String, Long> map = new HashMap<>();
        map.put("k1", 9007199254740991L);
        map.put("k2", -9007199254740991L);
        client.put(map);
    }
}
