package io.hasli.test.persist;

import io.hasli.barometer.Module;
import io.hasli.jpa.flyway.FlywayConfiguration;
import io.hasli.persist.core.ConfigurationSourceDataSourceConfiguration;
import io.hasli.persist.core.DatabaseConfiguration;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.test.common.PropertyConfigurationSourceConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;


/**
 * Created by haswell on 10/17/16.
 */


@Import({
        FlywayConfiguration.class,
        DatabaseConfiguration.class,
        HibernateConfiguration.class,
        PropertyConfigurationSourceConfiguration.class,
        ConfigurationSourceDataSourceConfiguration.class
})
@Module
@Configuration
public class HibernateTestCase {






}
