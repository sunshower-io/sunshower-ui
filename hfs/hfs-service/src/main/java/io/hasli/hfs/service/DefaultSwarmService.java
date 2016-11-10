package io.hasli.hfs.service;

import io.hasli.hfs.api.FilesystemException;
import io.hasli.hfs.api.ObjectDescriptor;
import io.hasli.hfs.api.SwarmService;
import io.hasli.hfs.configuration.AgentConfiguration;
import io.hasli.model.core.crypto.Multihash;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by haswell on 11/9/16.
 */
public class DefaultSwarmService implements SwarmService {


    private HFSClient client;

    private AgentConfiguration configuration;


    @Override
    public AgentConfiguration getConfiguration() {
        return this.configuration;
    }

    @Override
    public void setConfiguration(AgentConfiguration configuration) {
        this.configuration = configuration;
        this.client = new HFSClient(configuration.getAgentAddress());
    }

    @Override
    public ObjectDescriptor save(File file) {
        try {
            return new ObjectDescriptor(
                    this.client.add(new NamedStreamable.FileWrapper(file)));
        } catch (IOException e) {
            throw new FilesystemException(e);
        }

    }

    @Override
    public List<ObjectDescriptor> save(List<File> files) {
        try {
            return this.client.add(files.stream()
                    .map(NamedStreamable.FileWrapper::new)
                    .collect(Collectors.toList())).stream()
                    .map(ObjectDescriptor::new)
                    .collect(Collectors.toList());
        } catch(IOException ex) {
            throw new FilesystemException(ex);
        }
    }


    static final Object lock = new Object();
    @Override
    public ObjectDescriptor save(InputStream inputStream) {
        try {
            return new ObjectDescriptor(this.client.add(
                    new NamedStreamable.StreamWrapper(inputStream, true)));
        } catch (IOException e) {
            throw new FilesystemException(e);
        }
    }


    @Override
    public byte[] cat(Multihash multihash) {
        try {
            return this.client.cat(multihash);
        } catch (IOException e) {
            throw new FilesystemException(e);
        }
    }

    @Override
    public InputStream stream(Multihash multihash) {
        try {
            return this.client.catStream(multihash);
        } catch (IOException e) {
            throw new FilesystemException(e);
        }
    }

    @Override
    public List<Multihash> delete(Multihash hash) {
        try {
            return this.client.pin.rm(hash);
        } catch (IOException e) {
            throw new FilesystemException(e);
        }
    }

    @Override
    public List<ObjectDescriptor> list(Multihash hash) {
        return Collections.emptyList();
    }
}
