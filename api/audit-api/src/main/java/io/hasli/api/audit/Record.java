package io.hasli.api.audit;

import io.hasli.model.core.entity.AbstractEntity;
import io.hasli.model.core.entity.Persistable;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;
import javax.persistence.Basic;
import javax.persistence.MappedSuperclass;

/**
 * Created by haswell on 10/28/16.
 */
@MappedSuperclass
public abstract class Record<
        TID extends Serializable,
        UID extends Serializable,
        T extends Persistable<TID>,
        U extends Persistable<UID>
        > extends AbstractEntity<UUID> {




    private Date date;

    private String message;



    protected Record(UUID uuid) {
        super(uuid);
    }


    @Override
    public UUID getId() {
        return null;
    }

    @Override
    protected void setId(UUID uuid) {

    }


    public abstract T getTarget();

    public abstract U getCause();

    @Override
    protected void setDefaults() {

    }

    @Override
    public boolean equals(Object obj) {
        return false;
    }

    @Override
    public String toString() {
        return null;
    }


}
