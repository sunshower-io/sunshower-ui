package io.hasli.hal.api.instance;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.UUID;

/**
 * Created by haswell on 11/6/16.
 */
@Path("hal/nodes/configuration")
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML,
})
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML,
})
public interface NodeConfigurationService {

    @POST
    @Path("/")
    UUID save(NodeConfiguration configuration);


    @GET
    @Path("/")
    List<NodeConfiguration> list();

    @GET
    @Path("/{id}")
    NodeConfiguration get(@PathParam("id") UUID id);


}
