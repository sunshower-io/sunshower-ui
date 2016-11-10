package io.hasli.hfs.api;

import io.hasli.model.core.deployment.ApplicationDescriptor;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.InputStream;

/**
 * Created by haswell on 11/8/16.
 */

@Path("/hfs")
public interface FilesystemService {

    @POST
    @Path("/upload")
    @Consumes(MediaType.APPLICATION_OCTET_STREAM)
    @Produces({
            MediaType.APPLICATION_JSON,
            MediaType.APPLICATION_XML
    })
    ObjectDescriptor uploadFile(InputStream request);







    @POST
    @Path("/application")
    @Consumes(MediaType.APPLICATION_OCTET_STREAM)
    @Produces({
            MediaType.APPLICATION_JSON,
            MediaType.APPLICATION_XML
    })
    ApplicationDescriptor uploadApplication(InputStream request);

    @GET
    @Path("image/{id}")
    @Produces("image/svg+xml")
    byte[] image(@PathParam("id") String id);





}
