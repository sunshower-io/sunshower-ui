package io.io.hasli.service.security.web;

import io.hasli.barometer.Enable;
import io.hasli.barometer.Select;
import io.hasli.barometer.jaxrs.ClientContext;
import io.hasli.barometer.rpc.Remote;
import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.core.security.AuthenticationService;
import io.hasli.model.core.auth.Authentication;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.signup.SignupService;
import io.hasli.test.persist.EnableJPA;
import io.io.hasli.service.security.TestSecurityConfiguration;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.persistence.jaxb.rs.MOXyJsonProvider;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.Response;
import java.util.List;

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
                SecurityConfiguration.class,
                HibernateConfiguration.class,
                TestSecurityConfiguration.class
        })
@EnableJPA
@WebAppConfiguration
public class RESTSecurityTest {


    static Logger logger = LogManager.getLogger(RESTSecurityTest.class);



    @Remote
    private SignupService signupService;

    @Remote
    @ClientContext(
            provider = AuthenticationDecorator.class
    )
    private SignupService authenticatedSignupService;

    @Remote
    private AuthenticationService authenticationService;


    @Inject
    @Named("bind-address")
    private String address;

    @Inject
    @Named("jax-rs-port")
    private Integer port;

    @Test
    @WithMockUser(username = "test", password = "frap")
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
        u.setEmailAddress("joe16@email.com");
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
        u.setEmailAddress("joe2@email.com");
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
        nonauthClient.register(MOXyJsonProvider.class);
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
        u.setEmailAddress("joe5@email.com");
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


}
