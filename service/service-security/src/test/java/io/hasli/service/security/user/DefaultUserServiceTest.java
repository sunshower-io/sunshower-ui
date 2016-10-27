package io.hasli.service.security.user;

import io.hasli.core.security.UserService;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.persistence.Dialect;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.test.persist.HibernateTestCase;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.UUID;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertThat;


/**
 * Created by haswell on 10/18/16.
 */
@Rollback
@Transactional
@ContextConfiguration(classes = {
        HibernateConfiguration.class,
        SecurityConfiguration.class,
})
public class DefaultUserServiceTest extends HibernateTestCase {
    
    @Inject
    private Dialect dialect;


    @Inject
    private UserService userService;


    @PersistenceContext
    private EntityManager entityManager;

    @Test
    public void ensureDialectIsInjected() {
        assertThat(dialect, is(not(nullValue())));
    }


    @Test
    public void ensureFindByUsernameFindsUserByExactMatch() {
        UUID id  = UUID.randomUUID();
        final User user = new User(id, "josiah2", "coolbeans");
        user.setEmailAddress("joe@email.com3242");
        entityManager.persist(user);

        User saved = userService.findByUsername("josiah2");
        assertThat(saved, is(not(nullValue())));
    }

}