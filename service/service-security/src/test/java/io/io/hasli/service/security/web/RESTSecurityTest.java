package io.io.hasli.service.security.web;

import io.hasli.barometer.Enable;
import io.hasli.barometer.rpc.Remote;
import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.core.security.AuthenticationService;
import io.hasli.model.core.auth.Authentication;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.DefaultSignupService;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.security.TokenAuthenticationFilter;
import io.hasli.service.security.jaxrs.ExceptionMappings;
import io.hasli.service.signup.SignupService;
import io.hasli.test.persist.HibernateTestCase;
import io.io.hasli.service.security.TestSecurityConfiguration;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
import javax.inject.Named;
import javax.inject.Singleton;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.Path;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.ClientRequestContext;
import javax.ws.rs.client.ClientRequestFilter;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

/**
 * Created by haswell on 10/21/16.
 */

@Enable(JAXRS.class)
@RunWith(BarometerRunner.class)
@ContextConfiguration(
        classes = {
                JAXRS.class,
                SecurityConfiguration.class,
                HibernateConfiguration.class,
                TestSecurityConfiguration.class,
                RESTSecurityTest.class,
        })
@WebAppConfiguration
public class RESTSecurityTest extends HibernateTestCase {


    static Logger logger = LogManager.getLogger(RESTSecurityTest.class);



    @Remote
    private SignupService signupService;


    @Remote
    private AuthenticationService authenticationService;


    @Inject
    @Named("bind-address")
    private String address;

    @Inject
    @Named("jax-rs-port")
    private Integer port;

    @Test
    public void ensureAttemptingToAccessValidateThrowsException() throws InterruptedException {
        try {
            authenticationService.validate(new Token("frap", null));
            fail("Expected exception");
        } catch (ClientErrorException ex) {
            assertThat(ex.getResponse().getStatusInfo(), is(Response.Status.FORBIDDEN));
        }
    }


    @Test
    public void ensureAttemptingToAccessSecuredEndpointFails() throws InterruptedException {
        User u = new User();
        u.setUsername("josiah");
        u.setPassword("password");
        signupService.signup(u);


        try {
            signupService.list();
            fail("Expected exception");
        } catch (ClientErrorException ex) {
            assertThat(ex.getResponse().getStatusInfo(), is(Response.Status.FORBIDDEN));
        }
    }


    @Test
    public void ensureAttemptingToAccessSecuredEndpointAfterAuthenticationSucceeds() {
        String addr = String.format("http://%s:%d", address, port);
        final Client client =
                ClientBuilder.newClient();
        ResteasyClient rclient = (ResteasyClient) client;
        rclient.register(MOXyJsonProvider.class);
        final ResteasyWebTarget target =
                (ResteasyWebTarget) client.target(addr);

        final SignupService service =
                target.proxy(SignupService.class);

        final AuthenticationService authenticationService =
                target.proxy(AuthenticationService.class);

        User u = new User();
        u.setUsername("testuser3");
        u.setPassword("password");
        service.signup(u);

        Authentication token = authenticationService.authenticate(u);

        client.register(new TokenRequestFilter(token.getToken()));


        List<User> users = service.list();
        assertTrue(users.size() > 0);

    }


    @Test
    public void ensureMultipleClientsCantAccessSimultaneously() {


        final Client client =
                ClientBuilder.newClient();
        ResteasyClient rclient = (ResteasyClient) client;
        rclient.register(MOXyJsonProvider.class);
        final ResteasyWebTarget target =
                (ResteasyWebTarget) client.target(String.format("http://%s:%d", address, port));


        final Client nonauthClient =
                ClientBuilder.newClient();
        rclient.register(MOXyJsonProvider.class);
        final ResteasyWebTarget nonauthTarget =
                (ResteasyWebTarget) nonauthClient.target(String.format("http://%s:%d", address, port));

        final SignupService service =
                target.proxy(SignupService.class);

        final SignupService nonauthService = nonauthTarget.proxy(SignupService.class);

        final AuthenticationService authenticationService =
                target.proxy(AuthenticationService.class);

        User u = new User();
        u.setUsername("testuser4");
        u.setPassword("password");
        signupService.signup(u);

        Authentication token = authenticationService.authenticate(u);

        client.register(new TokenRequestFilter(token.getToken()));


        System.out.println(service.list());


        try {
            nonauthService.list();
            fail("Shouldn't have been allowed in");
        } catch (ClientErrorException ex) {
            assertThat(ex.getResponse().getStatusInfo(), is(Response.Status.FORBIDDEN));
        }

    }

    public static class TokenRequestFilter implements ClientRequestFilter {

        final Token token;

        public TokenRequestFilter(Token token) {
            this.token = token;
        }

        @Override
        public void filter(ClientRequestContext requestContext) throws IOException {
            requestContext.getHeaders().putSingle(
                    TokenAuthenticationFilter.HEADER_KEY, token.getToken());
        }
    }


}
