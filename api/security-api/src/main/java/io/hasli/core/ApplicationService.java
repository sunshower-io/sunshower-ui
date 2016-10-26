package io.hasli.core;

import io.hasli.model.core.Application;
import io.hasli.model.core.auth.User;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Set;

/**
 * Created by haswell on 10/26/16.
 */
@Path("initialize")
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_JSON
})
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_JSON
})
public interface ApplicationService {


    @GET
    @Path("/")
    Application instance();


    @GET
    Boolean isInitialized();

    @POST
    @Path("/")
    Application initialize(Application application);

    @GET
    @Path("/administrators")
    Set<User> getAdministrators();




    @POST
    @Path("/administrator/add")
    Boolean addAdministrator(User user);


    @POST
    @Path("/administrator/remove")
    Boolean removeAdministrator(User user);
}
