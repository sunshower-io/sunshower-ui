package io.hasli.service.security.user;

import io.hasli.core.security.UserService;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;
import io.hasli.vault.api.KeyProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.UUID;

/**
 * Created by haswell on 10/18/16.
 */
public class DefaultUserService implements UserService, UserDetailsService {

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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<User> users = entityManager
                .createQuery("select u from User u where u.username = :name", User.class)
                .setParameter("name", username)
                .getResultList();

        if(users.size() == 1) {
            return users.get(0);
        }

        throw new UsernameNotFoundException("Failed to locate user: " + username);

    }
}
