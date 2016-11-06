package io.hasli.model.core;

import io.hasli.model.core.entity.AbstractEntity;
import org.eclipse.persistence.oxm.annotations.XmlDiscriminatorNode;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.UUID;

/**
 *
 * Entities of this type may safely be allocated across a cluster
 * Created by haswell on 11/5/16.
 */
@MappedSuperclass
@XmlDiscriminatorNode("type")
public class DistributableEntity extends AbstractEntity<UUID> {

    @Id
    private UUID id;

    public DistributableEntity() {
        super(UUID.randomUUID());

    }



    @Override
    public UUID getId() {
        return id;
    }

    @Override
    protected void setId(UUID uuid) {
        this.id = uuid;
    }

    @Override
    protected void setDefaults() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DistributableEntity)) return false;

        DistributableEntity that = (DistributableEntity) o;

        return id != null ? id.equals(that.id) : that.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "DistributableEntity{" +
                "type=" + getClass().getName() +
                "id=" + id +
                '}';
    }
}
