package io.hasli.hfs.service;

import io.hasli.hfs.api.FilesystemService;
import io.hasli.hfs.api.ObjectDescriptor;
import io.hasli.hfs.api.SwarmService;
import io.hasli.hfs.configuration.AgentConfiguration;
import io.hasli.model.core.crypto.Multihash;
import io.hasli.model.core.deployment.ApplicationDescriptor;
import org.apache.commons.io.input.TeeInputStream;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.*;
import java.util.concurrent.ExecutorService;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

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
    public byte[] image(String id) {
        return this.swarmService.cat(Multihash.fromBase58(id));
    }




    @Inject
    private ExecutorService executorService;

    static class UploadDescriptorTask implements Runnable {
        final InputStream inputStream;
        final SwarmService swarmService;
        final ApplicationDescriptor descriptor;

        UploadDescriptorTask(
                final SwarmService swarmService,
                InputStream inputStream,
                ApplicationDescriptor descriptor
        ) {
            this.descriptor = descriptor;
            this.inputStream = inputStream;
            this.swarmService = swarmService;
        }


        @Override
        public void run() {
            ObjectDescriptor save = this.swarmService.save(inputStream);
            this.descriptor.setId(Multihash.fromBase58(save.getAddress()));
        }
    }

    static class MetadataDescriptorTask implements Runnable {
        final OutputStream outputStream;
        final SwarmService swarmService;
        final ZipInputStream inputStream;
        final ApplicationDescriptor descriptor;


        MetadataDescriptorTask(
                final SwarmService swarmService,
                final ZipInputStream inputStream,
                final ApplicationDescriptor descriptor,
                final OutputStream outputStream
        ) {
            this.outputStream = outputStream;
            this.inputStream = inputStream;
            this.swarmService = swarmService;
            this.descriptor = descriptor;
        }

        @Override
        public void run() {

            for (;;) {
                try {
                    ZipEntry nextEntry = inputStream.getNextEntry();
                    if (nextEntry == null) {
                        break;
                    }
                    ObjectDescriptor save = this.swarmService.save(
                            new NamedStreamable.EntryInputStream(
                                    nextEntry,
                                    inputStream
                            )
                    );

                    final String name = nextEntry.getName();
                    if (name.endsWith("README.md")) {
                        this.descriptor.setReadme(Multihash
                                .fromBase58(save.getAddress()));
                    } else if (name.endsWith("application.svg")) {
                        this.descriptor.setImage(Multihash
                                .fromBase58(save.getAddress()));
                    } else if (name.endsWith("Haslifile")) {
                        this.descriptor.setDeploymentFile(Multihash
                                .fromBase58(save.getAddress()));
                    }


                } catch (IOException e) {
                    e.printStackTrace();
                    break;
                }

            }
            try {
                this.outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

    @Override
    public ApplicationDescriptor uploadApplication(InputStream source) {
        final ApplicationDescriptor descriptor = new ApplicationDescriptor();
        try {


            final PipedInputStream pipe = new PipedInputStream();

            final PipedOutputStream output = new PipedOutputStream(pipe);
            final TeeInputStream metadataStream =
                    new TeeInputStream(source, output);

            final ZipInputStream inputStream = new ZipInputStream(metadataStream);
            final Thread uploadThread = new Thread(
                    new UploadDescriptorTask(
                            swarmService,
                            pipe,
                            descriptor)
            );
            final Thread metadataThread =
                    new Thread(new MetadataDescriptorTask(
                            swarmService,
                            inputStream,
                            descriptor,
                            output
                    ));
            metadataThread.setName("metadata");
            metadataThread.start();
            uploadThread.start();
            uploadThread.setName("upload");
            metadataThread.join();
            uploadThread.join();


        } catch(Exception ex) {
            ex.printStackTrace();

        }
        return descriptor;


    }

    @Override
    public ObjectDescriptor uploadFile(InputStream request) {
        return swarmService.save(request);
    }

}
