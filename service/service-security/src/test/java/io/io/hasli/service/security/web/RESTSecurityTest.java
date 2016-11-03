package io.io.hasli.service.security.web;

import io.hasli.barometer.Enable;
import io.hasli.barometer.Select;
import io.hasli.barometer.jaxrs.ClientContext;
import io.hasli.barometer.rpc.Remote;
import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.core.security.AuthenticationService;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.signup.SignupService;
import io.hasli.test.persist.EnableJPA;
import io.hasli.test.security.EnableSecurity;
import io.hasli.test.security.rs.AuthenticationDecorator;
import io.io.hasli.service.security.TestSecurityConfiguration;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.ClientErrorException;
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
@EnableSecurity
@WebAppConfiguration
public class RESTSecurityTest {


    static Logger logger = LogManager.getLogger(RESTSecurityTest.class);



    @Remote
    private SignupService signupService;

    @Remote
    @Select("authenticated")
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
    @WithMockUser(
            username = "testuser"
    )
    public void ensureAttemptingToAccessSecuredEndpointAfterAuthenticationSucceeds() {
        List<User> users = authenticatedSignupService.list();
        assertTrue(users.size() > 0);

    }


    @Test
    @WithMockUser(
            username = "testuser"
    )
    public void ensureMultipleClientsCantAccessSimultaneously() {
        System.out.println(authenticatedSignupService.list());
        try {
            signupService.list();
            fail("Shouldn't have been allowed in");
        } catch (ClientErrorException ex) {
            assertThat(ex.getResponse().getStatusInfo(), is(Response.Status.FORBIDDEN));
        }

    }


}
