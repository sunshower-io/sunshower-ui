package io.hasli.test.persist;

import io.hasli.jpa.flyway.FlywayConfiguration;
import io.hasli.persist.core.ConfigurationSourceDataSourceConfiguration;
import io.hasli.persist.core.DatabaseConfiguration;
import io.hasli.test.common.PropertyConfigurationSourceConfiguration;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


/**
 * Created by haswell on 10/17/16.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {
        FlywayConfiguration.class,
        DatabaseConfiguration.class,
        PropertyConfigurationSourceConfiguration.class,
        ConfigurationSourceDataSourceConfiguration.class
})
public abstract class HibernateTestCase {




}
