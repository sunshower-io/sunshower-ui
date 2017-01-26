package io.hasli.web.api;

import io.hasli.common.configuration.ConfigurationSource;
import io.hasli.common.configuration.MapConfigurationSource;
import io.hasli.common.rs.MoxyProvider;
import io.hasli.core.ApplicationService;
import io.hasli.hal.api.HALPersistenceConfiguration;
import io.hasli.hal.api.instance.NodeConfigurationService;
import io.hasli.hal.aws.AwsComputeService;
import io.hasli.hal.core.node.DefaultNodeConfigurationService;
import io.hasli.hal.docker.DockerConfiguration;
import io.hasli.hfs.service.HFSConfiguration;
import io.hasli.jpa.flyway.FlywayConfiguration;
import io.hasli.model.core.Application;
import io.hasli.model.core.PersistenceConfiguration;
import io.hasli.model.core.auth.User;
import io.hasli.persist.core.DataSourceConfiguration;
import io.hasli.persist.core.DatabaseConfiguration;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.search.es.SearchConfiguration;
import io.hasli.security.api.SecurityPersistenceConfiguration;
import io.hasli.service.CoreServiceConfiguration;
import io.hasli.service.csp.configuration.CSPServiceConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.vault.VaultConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by haswell on 10/14/16.
 */
@Configuration
@Import({
        CSPServiceConfiguration.class,
        FlywayConfiguration.class,
        DataSourceConfiguration.class,
        DatabaseConfiguration.class,
        HibernateConfiguration.class,
        SecurityConfiguration.class,
        VaultConfiguration.class,
        SearchConfiguration.class,
        HFSConfiguration.class,
        DockerConfiguration.class,
        PersistenceConfiguration.class,
        HALPersistenceConfiguration.class,
        SecurityPersistenceConfiguration.class,
        CoreServiceConfiguration.class
})
public class BootstrapConfiguration {

    @Inject
    @Named("createMigrations")
    private String flyway;


    public BootstrapConfiguration() {
    }


    @Bean
    public AwsComputeService awsComputeService() {
        return new AwsComputeService();
    }


    @Bean
    public MoxyProvider moxyProvider() {
        MoxyProvider provider = new MoxyProvider();
        return provider;
    }


    @Bean
    public ConfigurationSource configurationSource() {
        final Map<String, String> values = new HashMap<>();
        values.put("jpa.dialect", "org.hibernate.dialect.H2Dialect");
        values.put("jpa.ddl.generate", "false");
        values.put("jpa.naming.strategy", "org.hibernate.cfg.EJB3NamingStrategy");
        values.put("jpa.sql.show", "false");
        values.put("jpa.sql.format", "false");
        return new MapConfigurationSource(values);
    }


    @Bean
    public NodeConfigurationService nodeConfigurationService() {
        return new DefaultNodeConfigurationService();
    }


    @EventListener
    public void initializeApplication(ContextRefreshedEvent event) {
        final ApplicationService applicationService =
                event.getApplicationContext()
                        .getBean(ApplicationService.class);
        final Application application = new Application();
        application.setName("hasli.io");
        application.setEnabled(true);
        application.setLocation("https://site.hasli.io");

        final User administrator = new User();
        administrator.setEnabled(true);
        administrator.setUsername("administrator");
        administrator.setEmailAddress("administrator@hasli.io");
        administrator.setPassword("h4s1!43v3r!");
        application.setAdministrators(Collections.singletonList(administrator));
        applicationService.initialize(application);
    }

}
