package io.hasli.vault.api.secrets;

import io.hasli.model.core.auth.User;
import io.hasli.vault.api.Secret;
import org.eclipse.persistence.oxm.annotations.XmlDiscriminatorValue;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;
import java.util.UUID;

/**
 * Created by haswell on 10/28/16.
 */
@Entity
@XmlRootElement
@Table(name = "CREDENTIAL_SECRET")
@XmlDiscriminatorValue(
        "io.hasli.vault.api.secrets.CredentialSecret"
)
public class CredentialSecret extends Secret {

    @Id
    private UUID id;

    @Basic
    private String name;

    @Basic
    private String credential;

    @Basic
    private String secret;

    @Basic
    private String description;

    @Basic
    private Date created;

    @Basic
    private Date updated;

    @OneToOne
    private User modifier;



    public CredentialSecret() {
        this.id = UUID.randomUUID();
    }

    public CredentialSecret(UUID id) {
        this.id = id;
    }


    @Override
    public UUID getId() {
        return id;
    }

    @Override
    protected void setDefaults() {

    }

    @Override
    public boolean equals(Object obj) {
        return false;
    }


    @Override
    public String toString() {
        return "CredentialSecret{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", credential='" + credential + '\'' +
                ", secret='" + secret + '\'' +
                ", description='" + description + '\'' +
                ", created=" + created +
                ", updated=" + updated +
                ", modifier=" + modifier +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public User getModifier() {
        return modifier;
    }

    public void setModifier(User modifier) {
        this.modifier = modifier;
    }

    public String getCredential() {
        return credential;
    }

    public void setCredential(String credential) {
        this.credential = credential;
    }
}
