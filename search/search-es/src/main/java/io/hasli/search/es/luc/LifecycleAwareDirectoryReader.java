package io.hasli.search.es.luc;

import org.apache.lucene.index.DirectoryReader;
import org.springframework.stereotype.Service;

import javax.annotation.PreDestroy;
import java.io.IOException;

/**
 * Created by haswell on 11/8/16.
 */

@Service
public class LifecycleAwareDirectoryReader {

    private final DirectoryReader reader;

    public LifecycleAwareDirectoryReader(DirectoryReader reader) {
        this.reader = reader;
    }



    @PreDestroy
    public void close() {
        try {
            reader.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
