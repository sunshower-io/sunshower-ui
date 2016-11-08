package io.hasli.search.es;

import io.hasli.search.api.Document;
import io.hasli.search.api.QueryExtractor;
import io.hasli.search.es.luc.HALDocuments;
import io.hasli.search.service.SearchService;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.store.Directory;

import java.io.IOException;
import java.util.Set;

/**
 * Created by haswell on 11/5/16.
 */
public class HALProviderSearchService implements SearchService<Query> {


    private final Directory directory;

    public HALProviderSearchService(Directory directory) {
        this.directory = directory;
    }

    @Override
    public <T> Set<Document> search(
            T exemplar,
            QueryExtractor<Query, T> extractor) {

        try(final DirectoryReader reader = DirectoryReader.open(directory)) {
            final IndexSearcher searcher = new IndexSearcher(reader);
            return new HALDocuments(searcher.search(extractor.query(exemplar), 100));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
