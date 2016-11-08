package io.hasli.search.service;

import io.hasli.search.api.Document;
import io.hasli.search.api.QueryExtractor;

import java.util.Set;

/**
 * Created by haswell on 11/8/16.
 */
public interface SearchService<T> {
    <U> Set<Document> search(
            U exemplar,
            QueryExtractor<T, U> extractor
    );
}
