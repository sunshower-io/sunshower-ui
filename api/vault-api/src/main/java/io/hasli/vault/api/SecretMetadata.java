package io.hasli.vault.api;

import io.hasli.model.core.Metadata;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.UUID;

/**
 * Created by haswell on 11/1/16.
 */
@Entity
@Table(name = "CREDENTIAL_METADATA")
public class SecretMetadata extends Metadata {

    @Id
    private UUID id;

    @OneToOne
    private Secret secret;

    public SecretMetadata() {
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
        if (!(o instanceof SecretMetadata)) return false;

        SecretMetadata that = (SecretMetadata) o;

        return id != null ? id.equals(that.id) : that.id == null;

    }

    @Override
    public String toString() {
        return "SecretMetadata{" +
                "id=" + id +
                ", secret=" + secret +
                '}';
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
