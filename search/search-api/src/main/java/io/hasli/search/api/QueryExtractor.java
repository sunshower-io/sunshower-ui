package io.hasli.search.api;

/**
 * Created by haswell on 11/8/16.
 */
public interface QueryExtractor<T, U> {
    T query(U exemplar);
}
