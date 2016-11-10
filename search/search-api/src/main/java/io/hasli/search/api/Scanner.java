package io.hasli.search.api;

/**
 * Created by haswell on 11/8/16.
 */
public interface Scanner {

    <T> Document scan(T object);

    <T> Document scan(Class<T> clazz, T o);
}
