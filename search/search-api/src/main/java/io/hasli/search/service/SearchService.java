package io.hasli.search.service;

import io.hasli.search.api.Document;

import java.util.Set;

/**
 * Created by haswell on 11/8/16.
 */
public interface SearchService {
    <T> Set<Document> search(T exemplar);
}
