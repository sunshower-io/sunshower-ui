package io.hasli.vault.api;

import org.springframework.security.access.prepost.PreAuthorize;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.UUID;

/**
 * Created by haswell on 10/28/16.
 */
@Path("secrets/vault")
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
public interface VaultService {

    @POST
    @Path("/")
    @PreAuthorize("hasAuthority('admin')")
    Secret save(Secret secret);


    @GET
    @Path("/list")
    <T extends Secret> List<T> list(Class<T> type);

    @GET
    @Path("/{id}")
    <T extends Secret> T get(Class<T> type, @PathParam("id") UUID id);


}
