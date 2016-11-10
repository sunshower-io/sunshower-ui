package io.hasli.hfs.service;

import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.common.rs.MoxyProvider;
import io.hasli.test.security.rs.MoxyOverrideProvider;
import org.eclipse.persistence.jaxb.rs.MOXyJsonProvider;
import org.jboss.resteasy.plugins.server.tjws.TJWSEmbeddedJaxrsServer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.inject.Named;
import javax.inject.Singleton;

/**
 * Created by haswell on 11/9/16.
 */
@Configuration
public class TestConfiguration extends JAXRS {

    @Bean
    public MoxyOverrideProvider moxyProvider() {
        return new MoxyOverrideProvider();
    }

    @Bean
    @Singleton
    public TJWSEmbeddedJaxrsServer embeddedJaxrsServer(@Named("jax-rs-port") Integer port,
                                                       @Named("bind-address") String bindAddress
    ) {
        final TJWSEmbeddedJaxrsServer server = new TJWSEmbeddedJaxrsServer();
        server.setBindAddress(bindAddress);
        server.setPort(port);
        server.getDeployment()
                .getActualProviderClasses()
                .add(MOXyJsonProvider.class);
        server.start();
        return server;
    }
}
