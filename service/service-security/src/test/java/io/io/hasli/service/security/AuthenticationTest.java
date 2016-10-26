package io.io.hasli.service.security;

import io.hasli.core.security.AuthenticationService;
import io.hasli.core.security.InvalidCredentialException;
import io.hasli.core.security.crypto.EncryptionService;
import io.hasli.model.core.auth.Authentication;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.signup.SignupService;
import io.hasli.test.persist.HibernateTestCase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.ServletTestExecutionListener;

import static org.hamcrest.CoreMatchers.*;

import javax.inject.Inject;

import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 10/22/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
        classes = {
                SecurityConfiguration.class,
                HibernateConfiguration.class,
                TestSecurityConfiguration.class
        })


@Rollback
@TestExecutionListeners(
        listeners = {
                ServletTestExecutionListener.class,
                TransactionalTestExecutionListener.class,
                DirtiesContextTestExecutionListener.class,
                DependencyInjectionTestExecutionListener.class,
                WithSecurityContextTestExecutionListener.class
        })
public class AuthenticationTest extends HibernateTestCase {


    @Inject
    private SignupService service;

    @Inject
    private EncryptionService encryptionService;

    @Inject
    private AuthenticationService authenticationService;


    @Test
    @Rollback
    public void ensureSigningUpAndLoggingInWithSignedUpUserWorks() {
        final User user = new User();
        user.setUsername("Josiah1");
        user.setPassword("password1234");

        User u = service.signup(user);
        assertThat(u.getPassword(), is(not("password1234")));
    }


    @Test
    @Rollback
    public void ensureAuthenticatingWithRawUserWorks() {

        final User user = new User();
        user.setUsername("Josiah2");
        user.setPassword("password1234");

        final User user2 = new User();
        user2.setUsername("Josiah2");
        user2.setPassword("password1234");

        User u = service.signup(user);
        assertThat(u.getPassword(), is(not("password1234")));
        Authentication token = authenticationService.authenticate(user2);
        assertThat(token, is(not(nullValue())));
    }

    @Rollback
    @Test(expected = InvalidCredentialException.class)
    public void ensureAuthenticatingWithBadPasswordFails() {

        final User user = new User();
        user.setUsername("Josiah3");
        user.setPassword("password1");
        service.signup(user);
        User fake = new User();
        fake.setUsername("Josiah3");
        fake.setPassword("password");
        authenticationService.authenticate(fake);
    }


    @Test
    @Rollback
    public void ensureCreatingTokenWorks() {
        final User user = new User();
        user.setUsername("Josiah4");
        user.setPassword("password1");
        final User signedup = service.signup(user);

        long t1 = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            String token = encryptionService.createToken(signedup);
            User found = encryptionService.findByToken(token);
            assertThat(found, is(not(nullValue())));
        }
        long t2 = System.currentTimeMillis();

        System.out.format("Time per operation: %s\n", ((float) (t2 - t1)) / 1000f);

    }
}
