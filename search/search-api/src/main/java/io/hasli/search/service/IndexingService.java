package io.hasli.search.service;

/**
 * Created by haswell on 11/8/16.
 */
public interface IndexingService {
    <T> void index(T object);
    <T> void index(Iterable<T> objects);
}
