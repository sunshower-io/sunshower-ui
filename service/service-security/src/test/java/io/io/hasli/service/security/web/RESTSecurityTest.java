package io.io.hasli.service.security.web;

import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.DefaultSignupService;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.signup.SignupService;
import io.hasli.test.persist.HibernateTestCase;
import io.io.hasli.service.security.TestSecurityConfiguration;
import org.eclipse.persistence.jaxb.rs.MOXyJsonProvider;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;
import org.jboss.resteasy.plugins.server.tjws.TJWSEmbeddedJaxrsServer;
import org.jboss.resteasy.plugins.spring.SpringBeanProcessor;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.ServletTestExecutionListener;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Path;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import java.util.Map;

/**
 * Created by haswell on 10/21/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
        classes = {
                SecurityConfiguration.class,
                HibernateConfiguration.class,
                TestSecurityConfiguration.class,
                RESTSecurityTest.class,
        })

@Configuration
@TestExecutionListeners(listeners = {
        ServletTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        DependencyInjectionTestExecutionListener.class,
        WithSecurityContextTestExecutionListener.class
})
@WebAppConfiguration
public class RESTSecurityTest extends HibernateTestCase {

    @Inject
    private ApplicationContext context;

    private TJWSEmbeddedJaxrsServer server;

    @Bean
    @Singleton
    public TJWSEmbeddedJaxrsServer embeddedJaxrsServer() {
        final TJWSEmbeddedJaxrsServer server = new TJWSEmbeddedJaxrsServer();
        server.setPort(9191);
        server
                .getDeployment()
                .getActualProviderClasses()
                .add(MOXyJsonProvider.class);
        server.start();
        return server;
    }

    @Bean
    public SpringBeanProcessor springBeanProcessor(TJWSEmbeddedJaxrsServer server) {
        SpringBeanProcessor processor = new SpringBeanProcessor(
                server.getDeployment().getDispatcher(),
                server.getDeployment().getRegistry(),
                server.getDeployment().getProviderFactory());

        return processor;
    }


    @Test
    public void ensureAttemptingToAccessSecuredEndpointFails() throws InterruptedException {
        final Client client =
                ClientBuilder.newClient();
        ResteasyClient rclient = (ResteasyClient)  client;
        rclient.register(MOXyJsonProvider.class);
        final ResteasyWebTarget target =
                (ResteasyWebTarget) client.target("http://127.0.0.1:9191/");

        final SignupService service =
                target.proxy(SignupService.class);

        User u = new User();
        u.setUsername("josiah");
        service.signup(u);


        service.list();
    }



}
