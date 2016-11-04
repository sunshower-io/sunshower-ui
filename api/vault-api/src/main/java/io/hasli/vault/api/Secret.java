package io.hasli.vault.api;

import io.hasli.model.core.Metadata;
import io.hasli.model.core.auth.User;
import io.hasli.model.core.entity.AbstractEntity;
import io.hasli.model.core.entity.Persistable;
import io.hasli.vault.api.secrets.CredentialSecret;
import org.eclipse.persistence.oxm.annotations.XmlDiscriminatorNode;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import java.util.UUID;

/**
 * Created by haswell on 10/28/16.
 */
@Entity
@Inheritance(
    strategy = InheritanceType.TABLE_PER_CLASS
)
//// TODO: 11/2/16 I hate XmlSeeAlso as it limits extensibility.  Remove
@XmlSeeAlso({CredentialSecret.class})
@XmlDiscriminatorNode("@type")
public abstract class Secret extends AbstractEntity<UUID> implements Persistable<UUID> {

    @Id
    private UUID id;

    @OneToOne(
            orphanRemoval = true,
            cascade = CascadeType.ALL
    )
    @XmlElement
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

    public abstract void setModifier(User u);

    public abstract User getModifier();


    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public void set(String key, String value) {
        getMetadata().set(key, value);
    }

    public String get(String key) {
        return getMetadata().get(key);
    }

    @Override
    public String toString() {
        return "Secret{" +
                "id=" + id +
                ", metadata=" + metadata +
                '}';
    }
}
