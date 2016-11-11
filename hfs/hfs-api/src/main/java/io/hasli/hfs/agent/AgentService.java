package io.hasli.hfs.agent;

import io.hasli.hfs.configuration.AgentConfiguration;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by haswell on 11/9/16.
 */

@Path("/agent")
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
public interface AgentService {

    @GET
    @Path("configuration")
    AgentConfiguration get();

    @PUT
    @Path("configuration")
    AgentConfiguration save(AgentConfiguration input);

}
