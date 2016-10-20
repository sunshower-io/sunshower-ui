package io.hasli.service.security.user;

import io.hasli.core.security.UserService;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;
import io.hasli.vault.api.KeyProvider;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.UUID;

/**
 * Created by haswell on 10/18/16.
 */
public class DefaultUserService implements UserService {

    @Inject
    private KeyProvider keyProvider;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User get(UUID id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public Token createToken(User user) {
        return null;
    }

    @Override
    public User findByUsername(String username) {
        return entityManager.createQuery("select u from User u " +
                        "where u.username = :name", User.class)
                .setParameter("name", username).getSingleResult();
    }

    @Override
    public User findByToken(String accessToken) {
        return null;
    }
}
