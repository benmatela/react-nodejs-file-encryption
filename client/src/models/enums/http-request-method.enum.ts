/**
 * HTTP request methods
 */
export enum HTTP_REQUEST_METHOD {
    /**
     * The POST method submits an entity to the specified resource, 
     * often causing a change in state or side effects on the server.
     */
    POST = "",
    /**
     * The GET method requests a representation of the specified resource.
     */
    GET = "",
    /**
     * The DELETE method deletes the specified resource.
     */
    DELETE = "",
    /**
     * The PUT method replaces all current representations of the target 
     * resource with the request content.
     */
    PUT = "",
    /**
     * The PATCH method applies partial modifications to a resource.
     */
    PATCH = "",
    /**
     * The OPTIONS method describes the communication options for the target resource.
     */
    OPTIONS = ""
}