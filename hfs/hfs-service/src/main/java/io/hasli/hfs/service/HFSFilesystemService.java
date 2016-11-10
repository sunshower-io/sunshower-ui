package io.hasli.hfs.service;

import io.hasli.hfs.api.FilesystemService;
import io.hasli.hfs.api.ObjectDescriptor;
import io.hasli.hfs.api.SwarmService;
import io.hasli.hfs.configuration.AgentConfiguration;
import io.hasli.model.core.deployment.ApplicationDescriptor;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.InputStream;

/**
 * Created by haswell on 11/8/16.
 */
public class HFSFilesystemService implements FilesystemService {

    @Inject
    private SwarmService swarmService;




    @PUT
    @Path("/configuration")
    @Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML,
    })
    @Consumes({
            MediaType.APPLICATION_JSON,
            MediaType.APPLICATION_XML,
    })
    public AgentConfiguration setConfiguration(AgentConfiguration configuration) {
        this.swarmService.setConfiguration(configuration);
        return configuration;
    }



    @Override
    public ObjectDescriptor uploadFile(InputStream request) {
        return swarmService.save(request);
    }

    @Override
    public ApplicationDescriptor uploadApplication(InputStream request) {
        return null;
    }
}
