// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package type.dictionary.generated;

// The Java test files under 'generated' package are generated for your reference.
// If you wish to modify these files, please copy them out of the 'generated' package, and modify there.
// See https://aka.ms/azsdk/dpg/java/tests for guide on adding a test.

import com.azure.core.http.policy.HttpLogDetailLevel;
import com.azure.core.http.policy.HttpLogOptions;
import com.azure.core.test.TestMode;
import com.azure.core.test.TestProxyTestBase;
import com.azure.core.util.Configuration;
import type.dictionary.BooleanValueClient;
import type.dictionary.DatetimeValueClient;
import type.dictionary.DictionaryClientBuilder;
import type.dictionary.DurationValueClient;
import type.dictionary.Float32ValueClient;
import type.dictionary.Int32ValueClient;
import type.dictionary.Int64ValueClient;
import type.dictionary.ModelValueClient;
import type.dictionary.NullableFloatValueClient;
import type.dictionary.RecursiveModelValueClient;
import type.dictionary.StringValueClient;
import type.dictionary.UnknownValueClient;

class DictionaryClientTestBase extends TestProxyTestBase {
    protected Int32ValueClient int32ValueClient;

    protected Int64ValueClient int64ValueClient;

    protected BooleanValueClient booleanValueClient;

    protected StringValueClient stringValueClient;

    protected Float32ValueClient float32ValueClient;

    protected DatetimeValueClient datetimeValueClient;

    protected DurationValueClient durationValueClient;

    protected UnknownValueClient unknownValueClient;

    protected ModelValueClient modelValueClient;

    protected RecursiveModelValueClient recursiveModelValueClient;

    protected NullableFloatValueClient nullableFloatValueClient;

    @Override
    protected void beforeTest() {
        DictionaryClientBuilder int32ValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            int32ValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        int32ValueClient = int32ValueClientbuilder.buildInt32ValueClient();

        DictionaryClientBuilder int64ValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            int64ValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        int64ValueClient = int64ValueClientbuilder.buildInt64ValueClient();

        DictionaryClientBuilder booleanValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            booleanValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        booleanValueClient = booleanValueClientbuilder.buildBooleanValueClient();

        DictionaryClientBuilder stringValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            stringValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        stringValueClient = stringValueClientbuilder.buildStringValueClient();

        DictionaryClientBuilder float32ValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            float32ValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        float32ValueClient = float32ValueClientbuilder.buildFloat32ValueClient();

        DictionaryClientBuilder datetimeValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            datetimeValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        datetimeValueClient = datetimeValueClientbuilder.buildDatetimeValueClient();

        DictionaryClientBuilder durationValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            durationValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        durationValueClient = durationValueClientbuilder.buildDurationValueClient();

        DictionaryClientBuilder unknownValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            unknownValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        unknownValueClient = unknownValueClientbuilder.buildUnknownValueClient();

        DictionaryClientBuilder modelValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            modelValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        modelValueClient = modelValueClientbuilder.buildModelValueClient();

        DictionaryClientBuilder recursiveModelValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            recursiveModelValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        recursiveModelValueClient = recursiveModelValueClientbuilder.buildRecursiveModelValueClient();

        DictionaryClientBuilder nullableFloatValueClientbuilder = new DictionaryClientBuilder()
            .endpoint(Configuration.getGlobalConfiguration().get("ENDPOINT", "http://localhost:3000"))
            .httpClient(getHttpClientOrUsePlayback(getHttpClients().findFirst().orElse(null)))
            .httpLogOptions(new HttpLogOptions().setLogLevel(HttpLogDetailLevel.BASIC));
        if (getTestMode() == TestMode.RECORD) {
            nullableFloatValueClientbuilder.addPolicy(interceptorManager.getRecordPolicy());
        }
        nullableFloatValueClient = nullableFloatValueClientbuilder.buildNullableFloatValueClient();

    }
}
