package io.hasli.vault.api.audit;

import io.hasli.api.audit.AuditLog;
import io.hasli.model.core.auth.User;
import io.hasli.vault.api.Secret;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.UUID;

/**
 * Created by haswell on 10/28/16.
 */

@Entity
@XmlRootElement
public abstract  class CredentialAuditLog extends AuditLog<UUID,UUID,User,Secret> {


    @Id
    private UUID id;




    public CredentialAuditLog() {
        super(UUID.randomUUID());
    }


//    @Override
//    public List<Record> getEntries() {
//        return null;
//    }

    @Override
    public UUID getId() {
        return null;
    }

    @Override
    protected void setId(UUID uuid) {

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
        return null;
    }
}
