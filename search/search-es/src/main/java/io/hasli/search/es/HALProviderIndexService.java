package io.hasli.search.es;

import io.hasli.search.api.*;
import io.hasli.search.api.Document;
import io.hasli.search.api.Field;
import io.hasli.search.service.IndexingService;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;

/**
 * Created by haswell on 11/5/16.
 */
public class HALProviderIndexService implements IndexingService {

    private final Scanner scanner;
    private final Directory directory;
    private final IndexWriterConfig indexWriterConfiguration;

    private final FieldMappings<org.apache.lucene.document.Field> fieldMappings;


    public HALProviderIndexService(
            final Scanner scanner,
            final Directory directory,
            final IndexWriterConfig indexWriterConfiguration,
            final FieldMappings<org.apache.lucene.document.Field> fieldMappings
    ) {
        this.scanner = scanner;
        this.directory = directory;
        this.fieldMappings = fieldMappings;
        this.indexWriterConfiguration = indexWriterConfiguration;
    }

    @Override
    public <T> void index(T object) {
        try(final IndexWriter indexWriter =
                        new IndexWriter(
                                directory,
                                indexWriterConfiguration
                        )) {
            final org.apache.lucene.document.Document indexedDocument =
                    new org.apache.lucene.document.Document();
            final Document document = scanner.scan(object);
            for (Object o : document.getFields()) {
                index(indexedDocument, (Field) o);
            }
            indexWriter.addDocument(indexedDocument);
        } catch(Exception ex) {
            ex.printStackTrace();
        }
    }

    private void index(org.apache.lucene.document.Document indexedDocument, Field o) {
        final Field field = o;
        final FieldMapper<org.apache.lucene.document.Field> mapper =
                this.fieldMappings.resolve(field.getType());
        final org.apache.lucene.document.Field mappedField = mapper.map(field);
        indexedDocument.add(mappedField);
    }

    @Override
    public <T> void index(Iterable<T> objects) {
        try(final IndexWriter indexWriter =
                    new IndexWriter(
                            directory,
                            indexWriterConfiguration
                    )) {
            for(T object : objects) {
                final org.apache.lucene.document.Document indexedDocument =
                        new org.apache.lucene.document.Document();
                final Document document = scanner.scan(object);
                for (Object o : document.getFields()) {
                    index(indexedDocument, (Field) o);
                }
                indexWriter.addDocument(indexedDocument);
            }
        } catch(Exception ex) {
            ex.printStackTrace();
        }
    }


}
