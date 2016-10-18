package io.hasli.service.security.user;

import io.hasli.core.security.UserService;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.UUID;

/**
 * Created by haswell on 10/18/16.
 */
public class DefaultUserService implements UserService {

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
        return null;
    }

    @Override
    public User findByToken(String accessToken) {
        return null;
    }
}
