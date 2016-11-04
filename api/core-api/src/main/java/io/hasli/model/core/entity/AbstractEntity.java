package io.hasli.model.core.entity;

import io.hasli.model.core.auth.User;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;

/**
 * Created by haswell on 10/12/16.
 */
@XmlTransient
public abstract class AbstractEntity<ID extends Serializable>
        implements Persistable<ID> {
    

    protected AbstractEntity(ID id) {
        setId(id);
    }


    public abstract ID getId();

    protected abstract void setId(ID id);

    protected abstract void setDefaults();

    @Override
    public abstract boolean equals(Object obj);

    @Override
    public abstract String toString();


}
