package io.hasli.service.security.jaxrs;

import io.hasli.core.security.InvalidCredentialException;
import io.hasli.core.security.InvalidTokenException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;

import javax.persistence.NoResultException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by haswell on 10/22/16.
 */




@Provider
public class ExceptionMappings implements ExceptionMapper<Throwable> {

    static final Map<Class<? extends Throwable>, ExceptionResponse> mappings = new HashMap<>();

    static {
        register(
                AuthenticationCredentialsNotFoundException.class,
                new AuthenticationFailedResponse());
        register(
                InvalidCredentialException.class,
                new AuthenticationFailedResponse());
        register(
                InvalidTokenException.class,
                new AuthenticationFailedResponse());

        register(
                NoResultException.class,
                new NoSuchElementException());

        register(DataIntegrityViolationException.class,
                new ConstraintViolationException());
    }


    static void register(Class<? extends Throwable> key, ExceptionResponse response) {
        mappings.put(key, response);
    }


    @Override
    public Response toResponse(Throwable exception) {
        final ExceptionResponse exceptionResponse = mappings.get(exception.getClass());
        if(exceptionResponse == null) {
            System.out.println("GOT A" + exception);
            exception.printStackTrace();

            return Response.status(
                    Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(exception.getMessage()).build();
        }
        return mappings.get(exception.getClass()).create(exception);
    }

    public interface ExceptionResponse {
        Response create(Throwable throwable);
    }
}


class ConstraintViolationException implements ExceptionMappings.ExceptionResponse {

    @Override
    public Response create(Throwable throwable) {
        return Response.status(Response.Status.CONFLICT)
                .entity(throwable.getMessage()).build();
    }
}

class NoSuchElementException implements ExceptionMappings.ExceptionResponse {
    @Override
    public Response create(Throwable throwable) {
        return Response.status(Response.Status.NOT_FOUND)
                .entity(throwable.getMessage()).build();
    }
}

class AuthenticationFailedResponse implements ExceptionMappings.ExceptionResponse {
    @Override
    public Response create(Throwable throwable) {
        return Response.status(Response.Status.FORBIDDEN)
                .entity(throwable.getMessage()).build();
    }
}
