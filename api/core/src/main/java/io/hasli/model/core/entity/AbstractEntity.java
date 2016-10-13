package io.hasli.model.core.entity;

import java.io.Serializable;

/**
 * Created by haswell on 10/12/16.
 */
public abstract class AbstractEntity<ID extends Serializable> implements Persistable<ID> {
    private ID id;

    protected AbstractEntity(ID id) {
        setId(id);
    }

    protected void setId(ID id) {
        this.id = id;
    }

    @Override
    public ID getId() {
        return id;
    }

    protected abstract void setDefaults();

    @Override
    public abstract boolean equals(Object obj);

    @Override
    public abstract String toString();
}
