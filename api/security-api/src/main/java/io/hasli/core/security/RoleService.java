package io.hasli.core.security;

import io.hasli.model.core.auth.Role;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by haswell on 10/26/16.
 */
@Path("roles")
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
public interface RoleService {


    @GET
    @Path("{name}")
    Role findOrCreate(Role role);

}
