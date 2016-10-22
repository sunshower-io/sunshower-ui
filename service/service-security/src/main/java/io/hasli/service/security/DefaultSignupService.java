package io.hasli.service.security;

import io.hasli.core.security.crypto.EncryptionService;
import io.hasli.model.core.auth.Role;
import io.hasli.model.core.auth.User;
import io.hasli.service.signup.SignupService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by haswell on 10/17/16.
 */
@Service
@Transactional
public class DefaultSignupService implements SignupService {

    @PersistenceContext
    private EntityManager entityManager;

    @Inject
    private EncryptionService encryptionService;

    @Override
    public User signup(User user) {
        final Role admin = new Role(
                "admin",
                "Default administrator role"
        );

        user.setPassword(encryptionService
                .encrypt(user.getPassword()));
        user.addRole(admin);
        return entityManager.merge(user);
    }

    @Override
    @PreAuthorize("hasAuthority('admin')")
    public List<User> list() {
        return entityManager.createQuery("select u from User u").getResultList();
    }

}
