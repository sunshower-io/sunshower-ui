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


}
