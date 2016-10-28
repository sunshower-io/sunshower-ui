package io.hasli.vault.api.secrets;

import io.hasli.model.core.Metadata;
import io.hasli.vault.api.Secret;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.UUID;

/**
 * Created by haswell on 10/28/16.
 */
@Entity
@XmlRootElement
public class CredentialSecret implements Secret {

    @Id
    private UUID id;

    @Basic
    private String name;

    @Basic
    private String secret;

    @Basic
    private String description;



    @OneToOne
    private Metadata<UUID> metadata;


    public CredentialSecret(UUID uuid) {

    }


    @Override
    public UUID getId() {
        return null;
    }
}
