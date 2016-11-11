package io.hasli.search.api;

import java.io.Serializable;
import java.util.Set;

/**
 * Created by haswell on 11/5/16.
 */
public interface Document<T extends Serializable> {

    T getId();

    Set<Field> getFields();
}
