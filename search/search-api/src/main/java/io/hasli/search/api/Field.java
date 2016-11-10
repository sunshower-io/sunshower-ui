package io.hasli.search.api;

/**
 * Created by haswell on 11/8/16.
 */
public interface Field {

    String getName();

    Class<?> getType();

    Object getValue();
}
