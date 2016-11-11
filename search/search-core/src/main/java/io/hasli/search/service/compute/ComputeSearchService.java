package io.hasli.search.service.compute;

import io.hasli.hal.api.instance.InstanceDescriptor;
import io.hasli.hal.api.instance.NodeConfiguration;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.UUID;

/**
 * Created by haswell on 11/10/16.
 */
@Path("search/compute")
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
public interface ComputeSearchService {

    @GET
    @Path("/index")
    void index();


    @POST
    @Path("/")
    UUID save(NodeConfiguration descriptor);

    @GET
    @Path("{id}")
    List<InstanceDescriptor> search(@PathParam("id") UUID id);

}
