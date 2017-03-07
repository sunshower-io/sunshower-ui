package io.hasli.web.api;

import io.hasli.common.configuration.ConfigurationSource;
import io.hasli.common.configuration.MapConfigurationSource;
import io.hasli.common.rs.MoxyProvider;
import io.hasli.core.ApplicationService;
import io.hasli.hal.HALConfiguration;
import io.hasli.hal.aws.HALAwsConfiguration;
import io.hasli.jpa.flyway.FlywayConfiguration;
import io.hasli.model.core.Application;
import io.hasli.model.core.PersistenceConfiguration;
import io.hasli.model.core.auth.User;
import io.hasli.persist.core.DataSourceConfiguration;
import io.hasli.persist.core.DatabaseConfiguration;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.persistence.annotations.CacheMode;
import io.hasli.security.api.SecurityPersistenceConfiguration;
import io.hasli.service.CoreServiceConfiguration;
import io.hasli.service.events.ReactiveEventService;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.web.preferences.DefaultPreferencesService;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.security.concurrent.DelegatingSecurityContextScheduledExecutorService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import javax.enterprise.concurrent.ManagedExecutorService;
import javax.enterprise.concurrent.ManagedScheduledExecutorService;
import javax.inject.Inject;
import javax.inject.Named;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import java.lang.reflect.Method;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.*;
import java.util.logging.Level;
import java.util.logging.Logger;

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
        HALConfiguration.class,
        HALAwsConfiguration.class,
        PersistenceConfiguration.class,
        SecurityPersistenceConfiguration.class,
        CoreServiceConfiguration.class,
})
@EnableAsync
@CacheMode(CacheMode.Mode.Grid)
public class BootstrapConfiguration  implements AsyncConfigurer {

    static final Logger log = Logger.getLogger(BootstrapConfiguration.class.getName());

    @Inject
    @Named("createMigrations")
    private String flyway;



    public BootstrapConfiguration() {

        SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_GLOBAL);
        log.info("Starting Hasli.io");
    }

    @Bean
    public DefaultPreferencesService defaultPreferencesService() {
        return new DefaultPreferencesService();
    }

//    @Bean
//    public AwsComputeService awsComputeService() {
//        return new AwsComputeService();
//    }



    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
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
    public ScheduledExecutorService executorService() {
        try {
            log.info("Attempting to resolve managed executor service...");
            ManagedScheduledExecutorService service = InitialContext.doLookup(
                    "java:comp/DefaultManagedScheduledExecutorService"
            );
            log.info("Successfully resolve managed executor service");
            return service;
        } catch(NamingException ex) {
            log.info("Failed to resolve managed executor service.  " +
                    "Defaulting to fork-join pool.  Not all features may be available");
            return Executors.newScheduledThreadPool(
                    Runtime.getRuntime().availableProcessors()
            );
        }
    }


    @EventListener
    public void initializeApplication(ContextRefreshedEvent event) {
        log.info("Initializing Hasli");

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

        log.info("Hasli initialized");
    }


    @Override
    public Executor getAsyncExecutor() {
        return new DelegatingSecurityContextScheduledExecutorService(
                executorService(),
                SecurityContextHolder.getContext()
        );
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (ex, method, params) -> {
            log.log(Level.WARNING, "Caught exception {0} while processing task", ex.getMessage());
            log.log(Level.INFO, "Full stack trace", ex);
        };
    }
}
