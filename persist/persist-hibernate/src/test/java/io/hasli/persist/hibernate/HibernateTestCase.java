package io.hasli.persist.hibernate;

import io.hasli.jpa.flyway.FlywayConfiguration;
import io.hasli.persist.core.ConfigurationSourceDataSourceConfiguration;
import io.hasli.persist.core.DatabaseConfiguration;
import io.hasli.persistence.Dialect;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

/**
 * Created by haswell on 10/17/16.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {
        FlywayConfiguration.class,
        DatabaseConfiguration.class,
        HibernateConfiguration.class,
        PropertyConfigurationSourceConfiguration.class,
        ConfigurationSourceDataSourceConfiguration.class
})
@Transactional
public abstract class HibernateTestCase {

    @Inject
    private Dialect dialect;


    @Test
    public void ensureDialectIsRecognized() {
        //would fail if dialect wasn't
    }




}
