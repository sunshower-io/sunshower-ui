package io.hasli.service.security.jaxrs;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * Created by haswell on 10/22/16.
 */
@Provider
public class ExceptionMappings implements ExceptionMapper<AuthenticationCredentialsNotFoundException> {


    @Override
    public Response toResponse(AuthenticationCredentialsNotFoundException exception) {
        return Response.status(Response.Status.FORBIDDEN)
                .entity(exception.getMessage()).build();

    }
}
