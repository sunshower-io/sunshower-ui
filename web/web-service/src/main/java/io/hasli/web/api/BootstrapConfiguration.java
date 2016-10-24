package io.hasli.web.api;

import io.hasli.common.configuration.ConfigurationSource;
import io.hasli.common.configuration.MapConfigurationSource;
import io.hasli.jpa.flyway.FlywayConfiguration;
import io.hasli.model.core.auth.User;
import io.hasli.persist.core.DataSourceConfiguration;
import io.hasli.persist.core.DatabaseConfiguration;
import io.hasli.persist.hibernate.HibernateConfiguration;
//import io.hasli.service.security.CredentialAuthenticationService;
import io.hasli.service.security.DefaultSignupService;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.signup.SignupService;
import org.eclipse.persistence.jaxb.rs.MOXyJsonProvider;
import org.flywaydb.core.Flyway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.ext.Provider;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by haswell on 10/14/16.
 */
@Configuration
@Import({
        FlywayConfiguration.class,
        DataSourceConfiguration.class,
        DatabaseConfiguration.class,
        HibernateConfiguration.class,
        SecurityConfiguration.class,
})
public class BootstrapConfiguration {

    @Inject
    private Flyway flyway;

    public BootstrapConfiguration() {
    }


    @Bean
    public MOXyJsonProvider moxyProvider() {
        return new MOXyJsonProvider();
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



}
