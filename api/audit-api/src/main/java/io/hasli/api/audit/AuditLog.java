package io.hasli.api.audit;

import io.hasli.model.core.entity.AbstractEntity;
import io.hasli.model.core.entity.Persistable;

import javax.persistence.Basic;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

/**
 * Created by haswell on 10/28/16.
 */
@MappedSuperclass
public abstract class AuditLog<
        TID extends Serializable,
        UID extends Serializable,
        T extends Persistable<TID>,
        U extends Persistable<UID>
        >
        extends AbstractEntity<UUID> {

    @Basic
    private String description;

    protected AuditLog(UUID uuid) {
        super(uuid);
    }

    public abstract List<Record<TID, UID, T, U>> getEntries();
}
