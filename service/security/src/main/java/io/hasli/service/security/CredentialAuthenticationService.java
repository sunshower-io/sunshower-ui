package io.hasli.service.security;

import org.springframework.stereotype.Service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by haswell on 10/11/16.
 */

@Service
@Path("security")
@Produces(MediaType.TEXT_PLAIN)
public class CredentialAuthenticationService {

    @GET
    @Path("/")
    public String authenticate(
    ) {
        return "Hello";
    }

}
