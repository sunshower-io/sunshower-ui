package io.hasli.service.vault;

import io.hasli.model.core.auth.User;
import io.hasli.vault.api.Secret;
import io.hasli.vault.api.VaultService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.UUID;

/**
 * Created by haswell on 11/1/16.
 *
 */

@Transactional
public class DefaultVaultService implements VaultService {

    @Inject
    private UserDetails user;


    @PersistenceContext
    private EntityManager entityManager;


    public Secret save(Secret secret) {
        entityManager.persist(secret);
        entityManager.flush();
        return secret;
    }

    @Override
    public <T extends Secret> T get(Class<T> type, UUID id) {
        return entityManager.find(type, id);
    }

    @Override
    public <T extends Secret> List<T> list(Class<T> type) {
        final String query = String.format(
                "select s from %s as s",
                type.getName()
        );
        return entityManager.createQuery(query, type).getResultList();
    }


}
