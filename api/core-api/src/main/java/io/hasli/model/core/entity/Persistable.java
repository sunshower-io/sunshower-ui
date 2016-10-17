package io.hasli.model.core.entity;

import java.io.Serializable;

/**
 * Created by haswell on 10/12/16.
 */
public interface Persistable<ID extends Serializable> {

    ID getId();

    String toString();

    boolean equals(Object o);
}
