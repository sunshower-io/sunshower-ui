package io.hasli.service.security.user;

import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.persistence.Dialect;
import io.hasli.test.persist.HibernateTestCase;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertThat;


/**
 * Created by haswell on 10/18/16.
 */
@Transactional
@ContextConfiguration(classes = {
        HibernateConfiguration.class,
})
public class DefaultUserServiceTest extends HibernateTestCase {
    
    @Inject
    private Dialect dialect;
    
    @Test
    public void ensureDialectIsInjected() {
        assertThat(dialect, is(not(nullValue())));
    }

}