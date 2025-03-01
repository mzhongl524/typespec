// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package client.structure.service.implementation;

import client.structure.service.models.ClientType;
import com.azure.core.annotation.ExpectedResponses;
import com.azure.core.annotation.Host;
import com.azure.core.annotation.HostParam;
import com.azure.core.annotation.Post;
import com.azure.core.annotation.ReturnType;
import com.azure.core.annotation.ServiceInterface;
import com.azure.core.annotation.ServiceMethod;
import com.azure.core.annotation.UnexpectedResponseExceptionType;
import com.azure.core.exception.ClientAuthenticationException;
import com.azure.core.exception.HttpResponseException;
import com.azure.core.exception.ResourceModifiedException;
import com.azure.core.exception.ResourceNotFoundException;
import com.azure.core.http.HttpPipeline;
import com.azure.core.http.HttpPipelineBuilder;
import com.azure.core.http.policy.RetryPolicy;
import com.azure.core.http.policy.UserAgentPolicy;
import com.azure.core.http.rest.RequestOptions;
import com.azure.core.http.rest.Response;
import com.azure.core.http.rest.RestProxy;
import com.azure.core.util.Context;
import com.azure.core.util.FluxUtil;
import com.azure.core.util.serializer.JacksonAdapter;
import com.azure.core.util.serializer.SerializerAdapter;
import reactor.core.publisher.Mono;

/**
 * Initializes a new instance of the ServiceClientClient type.
 */
public final class ServiceClientClientImpl {
    /**
     * The proxy service used to perform REST calls.
     */
    private final ServiceClientClientService service;

    /**
     * Need to be set as 'http://localhost:3000' in client.
     */
    private final String endpoint;

    /**
     * Gets Need to be set as 'http://localhost:3000' in client.
     * 
     * @return the endpoint value.
     */
    public String getEndpoint() {
        return this.endpoint;
    }

    /**
     * Need to be set as 'default', 'multi-client', 'renamed-operation', 'two-operation-group' in client.
     */
    private final ClientType client;

    /**
     * Gets Need to be set as 'default', 'multi-client', 'renamed-operation', 'two-operation-group' in client.
     * 
     * @return the client value.
     */
    public ClientType getClient() {
        return this.client;
    }

    /**
     * The HTTP pipeline to send requests through.
     */
    private final HttpPipeline httpPipeline;

    /**
     * Gets The HTTP pipeline to send requests through.
     * 
     * @return the httpPipeline value.
     */
    public HttpPipeline getHttpPipeline() {
        return this.httpPipeline;
    }

    /**
     * The serializer to serialize an object into a string.
     */
    private final SerializerAdapter serializerAdapter;

    /**
     * Gets The serializer to serialize an object into a string.
     * 
     * @return the serializerAdapter value.
     */
    public SerializerAdapter getSerializerAdapter() {
        return this.serializerAdapter;
    }

    /**
     * The BazFoosImpl object to access its operations.
     */
    private final BazFoosImpl bazFoos;

    /**
     * Gets the BazFoosImpl object to access its operations.
     * 
     * @return the BazFoosImpl object.
     */
    public BazFoosImpl getBazFoos() {
        return this.bazFoos;
    }

    /**
     * The QuxesImpl object to access its operations.
     */
    private final QuxesImpl quxes;

    /**
     * Gets the QuxesImpl object to access its operations.
     * 
     * @return the QuxesImpl object.
     */
    public QuxesImpl getQuxes() {
        return this.quxes;
    }

    /**
     * The QuxBarsImpl object to access its operations.
     */
    private final QuxBarsImpl quxBars;

    /**
     * Gets the QuxBarsImpl object to access its operations.
     * 
     * @return the QuxBarsImpl object.
     */
    public QuxBarsImpl getQuxBars() {
        return this.quxBars;
    }

    /**
     * The FoosImpl object to access its operations.
     */
    private final FoosImpl foos;

    /**
     * Gets the FoosImpl object to access its operations.
     * 
     * @return the FoosImpl object.
     */
    public FoosImpl getFoos() {
        return this.foos;
    }

    /**
     * The BarsImpl object to access its operations.
     */
    private final BarsImpl bars;

    /**
     * Gets the BarsImpl object to access its operations.
     * 
     * @return the BarsImpl object.
     */
    public BarsImpl getBars() {
        return this.bars;
    }

    /**
     * Initializes an instance of ServiceClientClient client.
     * 
     * @param endpoint Need to be set as 'http://localhost:3000' in client.
     * @param client Need to be set as 'default', 'multi-client', 'renamed-operation', 'two-operation-group' in client.
     */
    public ServiceClientClientImpl(String endpoint, ClientType client) {
        this(new HttpPipelineBuilder().policies(new UserAgentPolicy(), new RetryPolicy()).build(),
            JacksonAdapter.createDefaultSerializerAdapter(), endpoint, client);
    }

    /**
     * Initializes an instance of ServiceClientClient client.
     * 
     * @param httpPipeline The HTTP pipeline to send requests through.
     * @param endpoint Need to be set as 'http://localhost:3000' in client.
     * @param client Need to be set as 'default', 'multi-client', 'renamed-operation', 'two-operation-group' in client.
     */
    public ServiceClientClientImpl(HttpPipeline httpPipeline, String endpoint, ClientType client) {
        this(httpPipeline, JacksonAdapter.createDefaultSerializerAdapter(), endpoint, client);
    }

    /**
     * Initializes an instance of ServiceClientClient client.
     * 
     * @param httpPipeline The HTTP pipeline to send requests through.
     * @param serializerAdapter The serializer to serialize an object into a string.
     * @param endpoint Need to be set as 'http://localhost:3000' in client.
     * @param client Need to be set as 'default', 'multi-client', 'renamed-operation', 'two-operation-group' in client.
     */
    public ServiceClientClientImpl(HttpPipeline httpPipeline, SerializerAdapter serializerAdapter, String endpoint,
        ClientType client) {
        this.httpPipeline = httpPipeline;
        this.serializerAdapter = serializerAdapter;
        this.endpoint = endpoint;
        this.client = client;
        this.bazFoos = new BazFoosImpl(this);
        this.quxes = new QuxesImpl(this);
        this.quxBars = new QuxBarsImpl(this);
        this.foos = new FoosImpl(this);
        this.bars = new BarsImpl(this);
        this.service
            = RestProxy.create(ServiceClientClientService.class, this.httpPipeline, this.getSerializerAdapter());
    }

    /**
     * The interface defining all the services for ServiceClientClient to be used by the proxy service to perform REST
     * calls.
     */
    @Host("{endpoint}/client/structure/{client}")
    @ServiceInterface(name = "ServiceClientClient")
    public interface ServiceClientClientService {
        @Post("/one")
        @ExpectedResponses({ 204 })
        @UnexpectedResponseExceptionType(value = ClientAuthenticationException.class, code = { 401 })
        @UnexpectedResponseExceptionType(value = ResourceNotFoundException.class, code = { 404 })
        @UnexpectedResponseExceptionType(value = ResourceModifiedException.class, code = { 409 })
        @UnexpectedResponseExceptionType(HttpResponseException.class)
        Mono<Response<Void>> one(@HostParam("endpoint") String endpoint, @HostParam("client") ClientType client,
            RequestOptions requestOptions, Context context);

        @Post("/one")
        @ExpectedResponses({ 204 })
        @UnexpectedResponseExceptionType(value = ClientAuthenticationException.class, code = { 401 })
        @UnexpectedResponseExceptionType(value = ResourceNotFoundException.class, code = { 404 })
        @UnexpectedResponseExceptionType(value = ResourceModifiedException.class, code = { 409 })
        @UnexpectedResponseExceptionType(HttpResponseException.class)
        Response<Void> oneSync(@HostParam("endpoint") String endpoint, @HostParam("client") ClientType client,
            RequestOptions requestOptions, Context context);

        @Post("/two")
        @ExpectedResponses({ 204 })
        @UnexpectedResponseExceptionType(value = ClientAuthenticationException.class, code = { 401 })
        @UnexpectedResponseExceptionType(value = ResourceNotFoundException.class, code = { 404 })
        @UnexpectedResponseExceptionType(value = ResourceModifiedException.class, code = { 409 })
        @UnexpectedResponseExceptionType(HttpResponseException.class)
        Mono<Response<Void>> two(@HostParam("endpoint") String endpoint, @HostParam("client") ClientType client,
            RequestOptions requestOptions, Context context);

        @Post("/two")
        @ExpectedResponses({ 204 })
        @UnexpectedResponseExceptionType(value = ClientAuthenticationException.class, code = { 401 })
        @UnexpectedResponseExceptionType(value = ResourceNotFoundException.class, code = { 404 })
        @UnexpectedResponseExceptionType(value = ResourceModifiedException.class, code = { 409 })
        @UnexpectedResponseExceptionType(HttpResponseException.class)
        Response<Void> twoSync(@HostParam("endpoint") String endpoint, @HostParam("client") ClientType client,
            RequestOptions requestOptions, Context context);
    }

    /**
     * The one operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response} on successful completion of {@link Mono}.
     */
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<Void>> oneWithResponseAsync(RequestOptions requestOptions) {
        return FluxUtil
            .withContext(context -> service.one(this.getEndpoint(), this.getClient(), requestOptions, context));
    }

    /**
     * The one operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> oneWithResponse(RequestOptions requestOptions) {
        return service.oneSync(this.getEndpoint(), this.getClient(), requestOptions, Context.NONE);
    }

    /**
     * The two operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response} on successful completion of {@link Mono}.
     */
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<Void>> twoWithResponseAsync(RequestOptions requestOptions) {
        return FluxUtil
            .withContext(context -> service.two(this.getEndpoint(), this.getClient(), requestOptions, context));
    }

    /**
     * The two operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> twoWithResponse(RequestOptions requestOptions) {
        return service.twoSync(this.getEndpoint(), this.getClient(), requestOptions, Context.NONE);
    }
}
