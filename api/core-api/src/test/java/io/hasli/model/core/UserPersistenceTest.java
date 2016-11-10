package io.hasli.model.core;

import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.jpa.flyway.FlywayConfiguration;
import io.hasli.model.core.auth.User;
import io.hasli.persist.core.ConfigurationSourceDataSourceConfiguration;
import io.hasli.persist.core.DatabaseConfiguration;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.test.common.PropertyConfigurationSourceConfiguration;
import io.hasli.test.persist.EnableJPA;
import io.hasli.test.persist.HibernateTestCase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.core.IsNot.not;
import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 10/17/16.
 */
@EnableJPA
@Transactional
@RunWith(BarometerRunner.class)
public class UserPersistenceTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    public void ensureEntityManagerIsInjected() {
        assertThat(entityManager, is(not(nullValue())));
    }

    @Test
    public void ensureSavingPersonWorks() {
        entityManager.persist(new User());
    }
}
