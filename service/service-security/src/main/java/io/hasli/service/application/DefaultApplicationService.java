package io.hasli.service.application;

import io.hasli.core.ApplicationService;
import io.hasli.core.security.RoleService;
import io.hasli.core.security.crypto.EncryptionService;
import io.hasli.model.core.Application;
import io.hasli.model.core.ApplicationInitializationException;
import io.hasli.model.core.auth.Role;
import io.hasli.model.core.auth.User;
import io.hasli.service.signup.SignupService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by haswell on 10/26/16.
 */
@Service
@Transactional
public class DefaultApplicationService implements ApplicationService {

    @PersistenceContext
    private EntityManager entityManager;

    @Inject
    private RoleService roleService;

    @Inject
    private SignupService signupService;


    @Inject
    private EncryptionService encryptionService;

    @Override
    public Application instance() {
        return entityManager.createQuery(
                "select a from Application a", Application.class)
                .getSingleResult();
    }

    @Override
    public Boolean isInitialized() {
        return entityManager.createQuery(
                "select count(a) from Application a " +
                        "where a.enabled = true", Long.class)
                .getSingleResult() == 1;
    }

    @Override
    public Application initialize(Application application) {
        if(!isInitialized()) {
            Collection<User> administrators = application.getAdministrators();
            if(administrators == null || administrators.size() == 0) {
                throw new ApplicationInitializationException(
                        "You must add at least one administrator " +
                                "or the application will not be accessible");
            }

            for(User u : administrators) {
                addAdministrator(u);
            }
            application.setEnabled(true);
            entityManager.persist(application);
            entityManager.flush();
            return application;
        } else {
            return instance();
        }
    }

    @Override
    public Set<User> getAdministrators() {
        return new HashSet<>(entityManager.createQuery(
                "select u from User u " +
                "left join fetch u.roles as r" +
                " where r.authority = 'system-administrator'",
                User.class).getResultList());
    }

    @Override
    public Boolean addAdministrator(User user) {
        final Role role = new Role(
                "system-administrator",
                "Has access to full application"
        );

        user.addRole(roleService.findOrCreate(role));


        final Role userRole = roleService.findOrCreate(
                new Role("admin", "Site Administrator Role"));
        user.addRole(userRole);

        user.setPassword(encryptionService.encrypt(user.getPassword()));
        entityManager.merge(user);
        return true;
    }

    @Override
    public Boolean removeAdministrator(User user) {
        return null;
    }
}
