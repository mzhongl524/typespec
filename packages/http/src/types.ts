import {
  DiagnosticResult,
  Interface,
  ListOperationOptions,
  Model,
  ModelProperty,
  Namespace,
  Operation,
  Program,
  Scalar,
  Tuple,
  Type,
} from "@typespec/compiler";
import { CookieOptions, PathOptions, QueryOptions } from "../generated-defs/TypeSpec.Http.js";
import { HeaderProperty, HttpProperty } from "./http-property.js";

export type HttpVerb = "get" | "put" | "post" | "patch" | "delete" | "head";

export interface Authentication {
  /**
   * Either one of those options can be used independently to authenticate.
   */
  options: AuthenticationOption[];
}

export interface AuthenticationOption {
  /**
   * For this authentication option all the given auth have to be used together.
   */
  schemes: HttpAuth[];
}

export type HttpAuth =
  | BasicAuth
  | BearerAuth
  | ApiKeyAuth<ApiKeyLocation, string>
  | Oauth2Auth<OAuth2Flow[]>
  | OpenIDConnectAuth
  | NoAuth;

export interface HttpAuthBase {
  /**
   * Id of the authentication scheme.
   */
  id: string;

  /**
   * Optional description.
   */
  description?: string;

  /** Model that defined the authentication */
  readonly model: Model;
}

/**
 * Basic authentication is a simple authentication scheme built into the HTTP protocol.
 * The client sends HTTP requests with the Authorization header that contains the word Basic word followed by a space and a base64-encoded string username:password.
 * For example, to authorize as demo / p@55w0rd the client would send
 * ```
 * Authorization: Basic ZGVtbzpwQDU1dzByZA==
 * ```
 */
export interface BasicAuth extends HttpAuthBase {
  type: "http";
  scheme: "Basic";
}

/**
 * Bearer authentication (also called token authentication) is an HTTP authentication scheme that involves security tokens called bearer tokens.
 * The name “Bearer authentication” can be understood as “give access to the bearer of this token.” The bearer token is a cryptic string, usually generated by the server in response to a login request.
 * The client must send this token in the Authorization header when making requests to protected resources:
 * ```
 *   Authorization: Bearer <token>
 * ```
 */
export interface BearerAuth extends HttpAuthBase {
  type: "http";
  scheme: "Bearer";
}

type ApiKeyLocation = "header" | "query" | "cookie";

/**
 * An API key is a token that a client provides when making API calls. The key can be sent in the query string:
 * ```
 * GET /something?api_key=abcdef12345
 * ```
 *
 * or as a request header
 *
 * ```
 * GET /something HTTP/1.1
 * X-API-Key: abcdef12345
 * ```
 *
 * or as a cookie
 *
 * ```
 * GET /something HTTP/1.1
 * Cookie: X-API-KEY=abcdef12345
 * ```
 */
export interface ApiKeyAuth<TLocation extends ApiKeyLocation, TName extends string>
  extends HttpAuthBase {
  type: "apiKey";
  in: TLocation;
  name: TName;
}

/**
 * OAuth 2.0 is an authorization protocol that gives an API client limited access to user data on a web server.
 * OAuth relies on authentication scenarios called flows, which allow the resource owner (user) to share the protected content from the resource server without sharing their credentials.
 * For that purpose, an OAuth 2.0 server issues access tokens that the client applications can use to access protected resources on behalf of the resource owner.
 * For more information about OAuth 2.0, see oauth.net and RFC 6749.
 */
export interface Oauth2Auth<TFlows extends OAuth2Flow[]> extends HttpAuthBase {
  type: "oauth2";
  flows: TFlows;
}

export type OAuth2Flow =
  | AuthorizationCodeFlow
  | ImplicitFlow
  | PasswordFlow
  | ClientCredentialsFlow;

export type OAuth2FlowType = OAuth2Flow["type"];

/**
 * Authorization Code flow
 */
export interface AuthorizationCodeFlow {
  type: "authorizationCode";
  authorizationUrl: string;
  tokenUrl: string;
  refreshUrl?: string;
  scopes: OAuth2Scope[];
}

/**
 * Implicit flow
 */
export interface ImplicitFlow {
  type: "implicit";
  authorizationUrl: string;
  refreshUrl?: string;
  scopes: OAuth2Scope[];
}

/**
 * Resource Owner Password flow
 */
export interface PasswordFlow {
  type: "password";
  authorizationUrl: string;
  refreshUrl?: string;
  scopes: OAuth2Scope[];
}

/**
 * Client credentials flow
 */
export interface ClientCredentialsFlow {
  type: "clientCredentials";
  tokenUrl: string;
  refreshUrl?: string;
  scopes: OAuth2Scope[];
}

export interface OAuth2Scope {
  value: string;
  description?: string;
}

/**
 * OpenID Connect (OIDC) is an identity layer built on top of the OAuth 2.0 protocol and supported by some OAuth 2.0 providers, such as Google and Azure Active Directory.
 * It defines a sign-in flow that enables a client application to authenticate a user, and to obtain information (or "claims") about that user, such as the user name, email, and so on.
 * User identity information is encoded in a secure JSON Web Token (JWT), called ID token.
 * OpenID Connect defines a discovery mechanism, called OpenID Connect Discovery, where an OpenID server publishes its metadata at a well-known URL, typically
 *
 * ```http
 * https://server.com/.well-known/openid-configuration
 * ```
 */
export interface OpenIDConnectAuth extends HttpAuthBase {
  type: "openIdConnect";
  openIdConnectUrl: string;
}

/**
 * This authentication option signifies that API is not secured at all.
 * It might be useful when overriding authentication on interface of operation level.
 */
export interface NoAuth extends HttpAuthBase {
  type: "noAuth";
}

export type HttpAuthRef = AnyHttpAuthRef | OAuth2HttpAuthRef | NoHttpAuthRef;

export interface AnyHttpAuthRef {
  readonly kind: "any";
  readonly auth: HttpAuth;
}

export interface NoHttpAuthRef {
  readonly kind: "noAuth";
  readonly auth: NoAuth;
}

/* Holder of this reference needs only a `scopes` subset of all scopes defined at `auth` */
export interface OAuth2HttpAuthRef {
  readonly kind: "oauth2";
  readonly auth: Oauth2Auth<OAuth2Flow[]>;
  readonly scopes: string[];
}

export interface AuthenticationReference {
  /**
   * Either one of those options can be used independently to authenticate.
   */
  readonly options: AuthenticationOptionReference[];
}

export interface AuthenticationOptionReference {
  /**
   * For this authentication option all the given auth have to be used together.
   */
  readonly all: HttpAuthRef[];
}

export interface HttpServiceAuthentication {
  /**
   * All the authentication schemes used in this service.
   * Some might only be used in certain operations.
   */
  readonly schemes: HttpAuth[];

  /**
   * Default authentication for operations in this service.
   */
  readonly defaultAuth: AuthenticationReference;

  /**
   * Authentication overrides for individual operations.
   */
  readonly operationsAuth: Map<Operation, AuthenticationReference>;
}

export type OperationContainer = Namespace | Interface;

/** @experimental */
export type OperationVerbSelector = (
  program: Program,
  operation: Operation,
) => HttpVerb | undefined;

/** @experimental */
export interface OperationParameterOptions {
  verbSelector?: OperationVerbSelector;
}

/** @experimental */
export interface RouteOptions {
  // Other options can be passed through the interface
  [prop: string]: any;

  paramOptions?: OperationParameterOptions;
}

/** @experimental */
export interface RouteResolutionOptions extends RouteOptions {
  listOptions?: ListOperationOptions;
}

/** @experimental */
export interface RouteProducerResult {
  uriTemplate: string;
  parameters: HttpOperationParameters;
}

/** @experimental */
export type RouteProducer = (
  program: Program,
  operation: Operation,
  parentSegments: string[],
  overloadBase: HttpOperation | undefined,
  options: RouteOptions,
) => DiagnosticResult<RouteProducerResult>;

export interface HeaderFieldOptions {
  type: "header";
  name: string;

  /**
   * Equivalent of adding `*` in the path parameter as per [RFC-6570](https://datatracker.ietf.org/doc/html/rfc6570#section-3.2.3)
   *
   *  | Style  | Explode | Primitive value = 5 | Array = [3, 4, 5] | Object = {"role": "admin", "firstName": "Alex"} |
   *  | ------ | ------- | ------------------- | ----------------- | ----------------------------------------------- |
   *  | simple | false   | `id=5`              | `3,4,5`           | `role,admin,firstName,Alex`                     |
   *  | simple | true    | `id=5`              | `3,4,5`           | `role=admin,firstName=Alex`                     |
   *
   */
  explode?: boolean;
}

export interface CookieParameterOptions extends Required<CookieOptions> {
  type: "cookie";
  name: string;
}

export interface QueryParameterOptions extends Required<QueryOptions> {
  type: "query";
}

export interface PathParameterOptions extends Required<PathOptions> {
  type: "path";
}

export type HttpOperationParameter =
  | HttpOperationHeaderParameter
  | HttpOperationCookieParameter
  | HttpOperationQueryParameter
  | HttpOperationPathParameter;

export type HttpOperationHeaderParameter = HeaderFieldOptions & {
  param: ModelProperty;
};
export type HttpOperationCookieParameter = CookieParameterOptions & {
  param: ModelProperty;
};
export type HttpOperationQueryParameter = QueryParameterOptions & {
  param: ModelProperty;
};
export type HttpOperationPathParameter = PathParameterOptions & {
  param: ModelProperty;
};

export interface HttpOperationParameters {
  /** Http properties */
  readonly properties: HttpProperty[];

  parameters: HttpOperationParameter[];

  body?: HttpPayloadBody;

  /**
   * @internal
   * NOTE: The verb is determined when processing parameters as it can
   * depend on whether there is a request body if not explicitly specified.
   * Marked internal to keep from polluting the public API with the verb at
   * two levels.
   */
  verb: HttpVerb;
}

export interface HttpService {
  namespace: Namespace;
  operations: HttpOperation[];
  authentication?: Authentication;
}

export interface HttpOperation {
  /**
   * The fully resolved uri template as defined by http://tools.ietf.org/html/rfc6570.
   * @example "/foo/{bar}/baz{?qux}"
   * @example "/foo/{+path}"
   */
  readonly uriTemplate: string;

  /**
   * Route path.
   * Not recommended use {@link uriTemplate} instead. This will not work for complex cases like not-escaping reserved chars.
   */
  path: string;

  /**
   * Route verb.
   */
  verb: HttpVerb;

  /**
   * Parent type being the interface, namespace or global namespace.
   */
  container: OperationContainer;

  /**
   * Parameters.
   */
  parameters: HttpOperationParameters;

  /**
   * Responses.
   */
  responses: HttpOperationResponse[];

  /**
   * Operation type reference.
   */
  operation: Operation;

  /**
   * Operation authentication. Overrides HttpService authentication
   */
  authentication?: Authentication;

  /**
   * Overload this operation
   */
  overloading?: HttpOperation;

  /**
   * List of operations that overloads this one.
   */
  overloads?: HttpOperation[];
}

export interface RoutePath {
  path: string;
  shared: boolean;
}

export interface HttpOperationResponse {
  /**
   * Status code or range of status code for the response.
   */
  statusCodes: HttpStatusCodeRange | number | "*";

  /**
   * Response TypeSpec type.
   */
  type: Type;

  /**
   * Response description.
   */
  description?: string;

  /**
   * Responses contents.
   */
  responses: HttpOperationResponseContent[];
}

export interface HttpOperationResponseContent {
  /** Http properties for this response */
  readonly properties: HttpProperty[];

  headers?: Record<string, ModelProperty>;
  body?: HttpPayloadBody;
}

/** The possible bodies of an HTTP operation. */
export type HttpPayloadBody =
  | HttpOperationBody
  | HttpOperationMultipartBody
  | HttpOperationFileBody;

export interface HttpOperationBodyBase {
  /** Content types. */
  readonly contentTypes: string[];
  /** Property used to set the content type if exists */
  readonly contentTypeProperty?: ModelProperty;

  /**
   * The payload property that defined this body, if any.
   */
  readonly property?: ModelProperty;
}

export interface HttpBody {
  readonly type: Type;

  /** If the body was explicitly set with `@body`. */
  readonly isExplicit: boolean;

  /** If the body contains metadata annotations to ignore. For example `@header`. */
  readonly containsMetadataAnnotations: boolean;
}

export interface HttpOperationBody extends HttpOperationBodyBase, HttpBody {
  readonly bodyKind: "single";
}

/** Body marked with `@multipartBody` */
export interface HttpOperationMultipartBody extends HttpOperationBodyBase {
  readonly bodyKind: "multipart";
  readonly type: Model | Tuple;
  /** Property annotated with `@multipartBody` */
  readonly property: ModelProperty;
  readonly parts: HttpOperationPart[];
}

/** The possible bodies of a multipart part. */
export type HttpOperationMultipartPartBody = HttpOperationBody | HttpOperationFileBody;

/** Represent an part in a multipart body. */
export interface HttpOperationPart {
  /** Property that defined the part if the model form is used. */
  readonly property?: ModelProperty;
  /** Part name */
  readonly name?: string;
  /** If the part is optional */
  readonly optional: boolean;
  /** Part body */
  readonly body: HttpOperationMultipartPartBody;
  /** If the Part is an HttpFile this is the property defining the filename */
  readonly filename?: ModelProperty;
  /** Part headers */
  readonly headers: HeaderProperty[];
  /** If there can be multiple of that part */
  readonly multi: boolean;
}

/**
 * The type of an HTTP body that is a file upload or download.
 */
export interface HttpOperationFileBody extends HttpOperationBodyBase {
  readonly bodyKind: "file";
  /**
   * The model type of the body that is or extends `Http.File`.
   */
  readonly type: Model;

  /**
   * Whether the file contents should be represented as a string or raw byte stream.
   *
   * True if the `contents` property is a `string`, `false` if it is `bytes`.
   *
   * Emitters may choose to represent textual files as strings or streams of textual characters.
   * If this property is `false`, emitters must expect that the contents may contain non-textual
   * data.
   */
  readonly isText: boolean;

  /**
   * The list of inner media types of the file. In other words, what kind of files can be returned.
   *
   * This is determined by the `contentType` property of the file model.
   */
  readonly contentTypes: string[];

  /**
   * The `contentType` property.
   */
  readonly contentTypeProperty: ModelProperty;

  /**
   * The filename property.
   */
  readonly filename: ModelProperty;

  /**
   * The `contents` property.
   */
  readonly contents: ModelProperty & { type: Scalar };
}

export interface HttpStatusCodeRange {
  start: number;
  end: number;
}

export type HttpStatusCodesEntry = HttpStatusCodeRange | number | "*";
export type HttpStatusCodes = HttpStatusCodesEntry[];
