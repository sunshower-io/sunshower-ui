package io.hasli.persist.hibernate;

import io.hasli.persist.core.ConfigurationSourceDataSourceConfiguration;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by haswell on 10/17/16.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {
        HibernateConfiguration.class,
        PropertyConfigurationSourceConfiguration.class,
        ConfigurationSourceDataSourceConfiguration.class
})
public abstract class HibernateTestCase {




}
