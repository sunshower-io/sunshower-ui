package io.hasli.search.api;

/**
 * Created by haswell on 11/8/16.
 */
public interface FieldMappings<T> {
    FieldMapper<T> resolve(Class<?> type);
}
