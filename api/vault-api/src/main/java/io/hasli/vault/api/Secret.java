package io.hasli.vault.api;

import io.hasli.model.core.Metadata;
import io.hasli.model.core.entity.AbstractEntity;
import io.hasli.model.core.entity.Persistable;

import javax.persistence.*;
import java.util.UUID;

/**
 * Created by haswell on 10/28/16.
 */
@Entity
@Inheritance(
    strategy = InheritanceType.TABLE_PER_CLASS
)
public abstract class Secret extends AbstractEntity<UUID> implements Persistable<UUID> {

    @Id
    private UUID id;

    @OneToOne(
            orphanRemoval = true,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "metadata_id")
    private Metadata metadata;

    public Secret() {
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


    public Metadata getMetadata() {
        if(metadata == null) {
            metadata = new SecretMetadata();
        }
        return metadata;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public void set(String key, String value) {
        getMetadata().set(key, value);
    }

    public String get(String key) {
        return getMetadata().get(key);
    }
}
