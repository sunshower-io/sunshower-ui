package io.hasli.hal.core.node;


import io.hasli.barometer.Enable;
import io.hasli.barometer.rpc.Remote;
import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.common.rs.DefaultConversionManager;
import io.hasli.hal.api.instance.NodeConfiguration;
import io.hasli.hal.api.instance.NodeConfigurationService;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.vault.VaultConfiguration;
import io.hasli.test.persist.EnableJPA;
import org.eclipse.persistence.internal.helper.ConversionManager;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.springframework.test.context.ContextConfiguration;

import javax.inject.Inject;

import java.util.UUID;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

/**
 * Created by haswell on 11/6/16.
 */
@EnableJPA
@RunWith(Suite.class)
@Suite.SuiteClasses({
        DefaultNodeConfigurationServiceTest
                .DefaultRestNodeConfigurationServiceTest.class,

        DefaultNodeConfigurationServiceTest
                .DefaultLocalNodeConfigurationServiceTest.class
})
@Enable(JAXRS.class)
@ContextConfiguration(classes = {
        VaultConfiguration.class,
        SecurityConfiguration.class,
        DefaultNodeConfigurationService.class,
        HibernateConfiguration.class,
})
public abstract class DefaultNodeConfigurationServiceTest {

    static {
        ConversionManager.setDefaultManager(DefaultConversionManager.getInstance());
    }


    @Test
    public void ensureServiceIsInjected() {
        assertThat(service(), is(not(nullValue())));
    }

    @Test
    public void ensureSavingSimpleNodeConfigurationWorks() {
        service().save(new NodeConfiguration());
//        assertThat(uuid, is(not(nullValue())));

    }


    protected abstract NodeConfigurationService service();



    @RunWith(BarometerRunner.class)
    public static class DefaultLocalNodeConfigurationServiceTest extends DefaultNodeConfigurationServiceTest {

        @Inject
        private NodeConfigurationService service;

        @Override
        protected NodeConfigurationService service() {
            return this.service;
        }
    }


    @RunWith(BarometerRunner.class )
    public static class DefaultRestNodeConfigurationServiceTest extends DefaultNodeConfigurationServiceTest {

        @Remote
        private NodeConfigurationService service;


        @Override
        protected NodeConfigurationService service() {
            return service;
        }
    }
}