package io.hasli.service.security.jaxrs;

import io.hasli.core.security.SecurityException;
import org.springframework.security.access.event.AuthenticationCredentialsNotFoundEvent;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;

import javax.transaction.SystemException;
import javax.ws.rs.ForbiddenException;
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
