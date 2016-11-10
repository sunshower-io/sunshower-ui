package io.hasli.hfs.api;

import io.hasli.hfs.configuration.AgentConfiguration;
import io.hasli.model.core.crypto.Multihash;

import java.io.File;
import java.io.InputStream;
import java.util.List;

/**
 * Created by haswell on 11/9/16.
 */
public interface SwarmService {

    AgentConfiguration getConfiguration();

    void setConfiguration(AgentConfiguration configuration);


    ObjectDescriptor save(File file);

    byte[] cat(Multihash id);


    InputStream stream(Multihash multihash);

    List<Multihash> delete(Multihash hash);

    List<ObjectDescriptor> list(Multihash hash);

    List<ObjectDescriptor> save(List<File> files);

    ObjectDescriptor save(InputStream inputStream);


}
