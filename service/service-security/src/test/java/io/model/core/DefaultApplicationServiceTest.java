package io.model.core;

import io.hasli.core.ApplicationService;
import io.hasli.model.core.Application;
import io.hasli.model.core.auth.Role;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.test.persist.HibernateTestCase;
import io.io.hasli.service.security.TestSecurityConfiguration;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.Set;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

/**
 * Created by haswell on 10/26/16.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
        classes = {
                SecurityConfiguration.class,
                HibernateConfiguration.class,
                TestSecurityConfiguration.class
        })
@Transactional
public class DefaultApplicationServiceTest extends HibernateTestCase {

    @PersistenceContext
    private EntityManager entityManager;

    @Inject
    private ApplicationService applicationService;


    @Test
    public void ensureApplicationCanBePersistedCorrectly() {
        final Application application = new Application();
        entityManager.persist(application);
        entityManager.flush();
    }


    @Test
    public void ensureApplicationCanBeInitializedCorrectly() {
        Application app = new Application();
        final User u = new User();
        u.setUsername("Josiah");
        u.setPassword("Haswell");
        u.setEmailAddress("josiah@hasli.io");

        assertFalse(applicationService.isInitialized());

        app.addAdministrator(u);
        applicationService.initialize(app);
        assertTrue(applicationService.isInitialized());
    }

    @Test
    public void ensureInitializedApplicationHasCorrectUsers() {

        Application app = new Application();
        final User u = new User();
        u.setUsername("Josiah");
        u.setPassword("Haswell");
        u.setEmailAddress("josiah@hasli.io");

        app.addAdministrator(u);
        applicationService.initialize(app);
        assertThat(applicationService.getAdministrators().size(), is(1));

        Set<User> admins = applicationService.getAdministrators();
        User admin = admins.iterator().next();
        assertThat(admin.getAuthorities().size(), is(2));

    }
}
