package io.hasli.service.security;

import io.hasli.model.core.auth.User;
import org.springframework.stereotype.Service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by haswell on 10/11/16.
 */

@Service
@Path("security")
@Produces(MediaType.APPLICATION_XML)
public class CredentialAuthenticationService {

    @GET
    @Path("/authenticate")
    public User authenticate() {
        User u = new User();
        u.setPassword("frap");
        u.setUsername("adap");
        return u;
    }

}
