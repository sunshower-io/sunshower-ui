package io.hasli.core.security;
import io.hasli.model.core.auth.Authentication;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by haswell on 10/12/16.
 */
@Path("authenticate")
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML,
})
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML,
})
public interface AuthenticationService {

    @POST
    @Path("authenticate")
    Authentication authenticate(User user);


    @POST
    @Path("validate")
    Authentication validate(Token token);


}
