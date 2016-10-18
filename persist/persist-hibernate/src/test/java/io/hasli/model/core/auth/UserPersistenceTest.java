package io.hasli.model.core.auth;

import io.hasli.persist.hibernate.HibernateTestCase;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.core.IsNot.not;
import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 10/17/16.
 */

public class UserPersistenceTest extends HibernateTestCase {

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
