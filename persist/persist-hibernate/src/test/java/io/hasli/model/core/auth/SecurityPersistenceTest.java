package io.hasli.model.core.auth;

import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.test.persist.EnableJPA;
import io.hasli.test.persist.HibernateTestCase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by haswell on 10/20/16.
 */
@EnableJPA
@RunWith(BarometerRunner.class)
@Transactional
@ContextConfiguration(classes = HibernateConfiguration.class)
public class SecurityPersistenceTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    public void ensureSavingAUserWithNoRolesWorks() {
        User user = new User();
        user.setUsername("josiah");
        user.setPassword("test");
        user.setEmailAddress("josiah@whatever");
        entityManager.persist(user);
        entityManager.flush();
    }

    @Test
    public void ensureSavingAUserWithARoleWorks() {
        User user = new User();
        user.setUsername("Josiah");
        user.setPassword("Haswell");
        user.addRole(new Role("admin"));
        user.setEmailAddress("josiah@whatever");
        entityManager.persist(user);
        entityManager.flush();
    }


    @Test
    public void ensureSavingAUserWithARoleWithAPermissionWorks() {

        User user = new User();
        user.setUsername("Josiah");
        user.setPassword("Haswell");
        user.addRole(new Role("admin")
                .addPermission(new Permission("cool")));
        user.setEmailAddress("josiah@whatever");
        entityManager.persist(user);
        entityManager.flush();
    }
}
