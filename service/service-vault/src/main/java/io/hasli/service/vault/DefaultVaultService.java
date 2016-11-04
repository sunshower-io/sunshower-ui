package io.hasli.service.vault;

import io.hasli.core.security.UserService;
import io.hasli.model.core.auth.User;
import io.hasli.service.security.UserFacade;
import io.hasli.vault.api.Secret;
import io.hasli.vault.api.VaultService;
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
    private UserFacade user;


    @Inject
    private UserService userService;


    @PersistenceContext
    private EntityManager entityManager;


    public Secret save(Secret secret) {
        User u = userService.findByUsername(user.getUsername());
        secret.setModifier(u);
        entityManager.persist(secret);
        entityManager.flush();
        return secret;
    }

    @Override
    public <T extends Secret> T get(Class<T> type, UUID id) {
        return entityManager.find(type, id);
    }

    @Override
    public  List<Secret> list(Class<Secret> type) {
        final String query = String.format(
                "select s from %s as s " +
                        "left join fetch s.modifier m " +
                        "left join fetch m.roles r",
                type.getName()
        );
        return entityManager.createQuery(query, type).getResultList();
    }


}
