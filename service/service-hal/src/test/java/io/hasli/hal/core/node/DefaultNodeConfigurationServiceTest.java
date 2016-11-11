package io.hasli.hal.core.node;


import io.hasli.barometer.Enable;
import io.hasli.barometer.rpc.Remote;
import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.common.rs.DefaultConversionManager;
import io.hasli.hal.api.compute.ComputeProfile;
import io.hasli.hal.api.instance.NodeConfiguration;
import io.hasli.hal.api.instance.NodeConfigurationService;
import io.hasli.hal.api.memory.MemoryProfile;
import io.hasli.hal.api.storage.StorageProfile;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.vault.VaultConfiguration;
import io.hasli.test.persist.EnableJPA;
import io.hasli.test.security.rs.MoxyOverrideProvider;
import org.eclipse.persistence.internal.helper.ConversionManager;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
        DefaultNodeConfigurationServiceTest.class,
})
@Configuration
public abstract class DefaultNodeConfigurationServiceTest {


    @Bean
    public MoxyOverrideProvider overrideProvider() {
        return new MoxyOverrideProvider();

    }


    static {
        ConversionManager.setDefaultManager(DefaultConversionManager.getInstance());
    }


    @Test
    public void ensureServiceIsInjected() {
        assertThat(service(), is(not(nullValue())));
    }

    @Test
    public void ensureSavingSimpleNodeConfigurationWorks() {
        UUID uuid = service().save(new NodeConfiguration());
        assertThat(uuid, is(not(nullValue())));
    }

    @Test
    public void ensureSavingComplexNodeConfigurationWorks() {
        NodeConfiguration configuration = new NodeConfiguration();
        ComputeProfile profile = new ComputeProfile();
        profile.setCores(5);

        StorageProfile storageProfile = new StorageProfile();
        storageProfile.setCapacity(500l);

        MemoryProfile memoryProfile = new MemoryProfile();
        memoryProfile.setCapacity(500l);

        configuration.setComputeProfile(profile);
        configuration.setMemoryProfile(memoryProfile);
        configuration.setStorageProfile(storageProfile);


        UUID uuid = service().save(configuration);
        assertThat(uuid, is(not(nullValue())));

        NodeConfiguration cfg = service().get(uuid);
        assertThat(cfg.getComputeProfile().getCores(), is(5));
        service().list();
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