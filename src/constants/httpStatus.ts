
export const HTTP_STATUS = {
  // 📘 Informational Responses (100–199)
  CONTINUE: 100,                        // Client should continue request
  SWITCHING_PROTOCOLS: 101,            // Switching from HTTP to another protocol (e.g. WebSocket)
  EARLY_HINTS: 103,                    // Suggest resources to preload before full response

  // ✅ Successful Responses (200–299)
  OK: 200,                             // Request succeeded (GET/POST/PUT/DELETE)
  CREATED: 201,                        // Resource created (POST/PUT)
  ACCEPTED: 202,                       // Request accepted for processing (async)
  NON_AUTHORITATIVE_INFORMATION: 203, // Metadata from another source (e.g. proxy)
  NO_CONTENT: 204,                     // Success, no content returned (DELETE/update toggle)
  RESET_CONTENT: 205,                 // Reset form or view on client side
  PARTIAL_CONTENT: 206,               // Partial response for range requests (downloads)
  MULTI_STATUS: 207,                  // Multi-resource response (WebDAV)
  ALREADY_REPORTED: 208,             // Repeated resource skipped in WebDAV
  IM_USED: 226,                        // Instance-manipulation applied to current instance

  // 🔁 Redirection Messages (300–399)
  MULTIPLE_CHOICES: 300,              // Multiple resource options (rare)
  MOVED_PERMANENTLY: 301,             // Resource moved forever — SEO, redirects
  FOUND: 302,                          // Temporary redirect (login to dashboard)
  SEE_OTHER: 303,                      // Redirect after POST to a GET route
  NOT_MODIFIED: 304,                  // Cached resource still valid (ETag)
  TEMPORARY_REDIRECT: 307,            // Like 302 but preserves method (POST → POST)
  PERMANENT_REDIRECT: 308,            // Like 301 but preserves method

  // ❌ Client Error Responses (400–499)
  BAD_REQUEST: 400,                   // Validation or syntax error
  UNAUTHORIZED: 401,                 // Missing or invalid token
  PAYMENT_REQUIRED: 402,             // Reserved for future use (e.g. paid APIs)
  FORBIDDEN: 403,                     // Authenticated but not authorized (e.g. admin only)
  NOT_FOUND: 404,                     // Resource or route not found
  METHOD_NOT_ALLOWED: 405,           // Wrong HTTP method (e.g. PUT on GET route)
  NOT_ACCEPTABLE: 406,               // Can't fulfill Accept headers (e.g. language)
  PROXY_AUTH_REQUIRED: 407,          // Proxy authentication needed
  REQUEST_TIMEOUT: 408,              // Server closed idle connection
  CONFLICT: 409,                      // Data conflict (e.g. duplicate email)
  GONE: 410,                          // Resource permanently removed (e.g. expired link)
  LENGTH_REQUIRED: 411,              // Content-Length header missing
  PRECONDITION_FAILED: 412,          // ETag or header condition not met
  CONTENT_TOO_LARGE: 413,            // Payload too big (e.g. file upload)
  URI_TOO_LONG: 414,                 // URL too long (maybe infinite redirects)
  UNSUPPORTED_MEDIA_TYPE: 415,       // Server doesn’t support request’s content type
  RANGE_NOT_SATISFIABLE: 416,        // Requested byte range out of bounds
  EXPECTATION_FAILED: 417,           // `Expect: 100-continue` failed
  IM_A_TEAPOT: 418,                   // Joke status (used for fun Easter eggs)
  MISDIRECTED_REQUEST: 421,          // Wrong server in multi-tenant system
  UNPROCESSABLE_ENTITY: 422,         // Semantic error in valid request (form logic)
  LOCKED: 423,                        // Resource is locked (WebDAV)
  FAILED_DEPENDENCY: 424,            // Previous request failure caused this one to fail
  TOO_EARLY: 425,                     // Retry later (HTTP Early Data)
  UPGRADE_REQUIRED: 426,             // Client must switch to newer protocol (e.g. HTTP/2)
  PRECONDITION_REQUIRED: 428,        // Require conditional request (e.g. ETag)
  TOO_MANY_REQUESTS: 429,            // Rate limit exceeded (e.g. spam protection)
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // Headers too large
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,   // Blocked due to legal reason (e.g. DMCA/censorship)

  // 💥 Server Error Responses (500–599)
  INTERNAL_SERVER_ERROR: 500,        // General server error (fallback)
  NOT_IMPLEMENTED: 501,              // Method not supported (e.g. PATCH not handled)
  BAD_GATEWAY: 502,                  // Gateway/proxy got invalid response
  SERVICE_UNAVAILABLE: 503,          // Server overloaded or under maintenance
  GATEWAY_TIMEOUT: 504,              // Gateway didn’t get response in time
  HTTP_VERSION_NOT_SUPPORTED: 505,   // HTTP version not supported
  VARIANT_ALSO_NEGOTIATES: 506,      // Server misconfigured for content negotiation
  INSUFFICIENT_STORAGE: 507,         // Server full (WebDAV)
  LOOP_DETECTED: 508,                // Infinite loop in resource processing
  NOT_EXTENDED: 510,                 // Missing required extension
  NETWORK_AUTHENTICATION_REQUIRED: 511 // Network requires auth (e.g. hotel Wi-Fi)
};
