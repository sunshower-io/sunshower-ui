package io.hasli.service.signup;

import io.hasli.model.core.auth.User;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by haswell on 10/17/16.
 */
@Path("signup")
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML,
})
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML,
})
public interface SignupService {



    @POST
    @Path("signup")
    User signup(User input);

    @GET
    @Path("list")
    List<User> list();

}
