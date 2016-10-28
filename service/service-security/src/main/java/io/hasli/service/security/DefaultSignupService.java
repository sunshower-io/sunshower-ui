package io.hasli.service.security;

import io.hasli.core.security.RoleService;
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
import java.util.Set;

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

    @Inject
    private RoleService roleService;

    @Override
    public User signup(User user) {
        final Role role = roleService.findOrCreate(
                new Role("admin", "Site Administrator Role"));

        user.setPassword(encryptionService
                .encrypt(user.getPassword()));
        user.addRole(role);
        return entityManager.merge(user);
    }

    @Override
    @PreAuthorize("hasAuthority('admin')")
    public List<User> list() {
        return entityManager.createQuery(
                "select u from User u left join fetch u.roles ",
                User.class
        ).getResultList();
    }

}
