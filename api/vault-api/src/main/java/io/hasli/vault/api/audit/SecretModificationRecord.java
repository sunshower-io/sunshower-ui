package io.hasli.vault.api.audit;

import io.hasli.api.audit.Record;
import io.hasli.model.core.auth.User;
import io.hasli.vault.api.Secret;

import java.util.UUID;

/**
 * Created by haswell on 10/28/16.
 */
public class SecretModificationRecord extends Record<UUID, UUID, User, Secret> {


    public SecretModificationRecord() {
        super(UUID.randomUUID());
    }

    @Override
    public User getTarget() {
        return null;
    }

    @Override
    public Secret getCause() {
        return null;
    }
}
