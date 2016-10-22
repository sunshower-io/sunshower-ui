package io.io.hasli.service.security;

import io.hasli.core.security.AuthenticationService;
import io.hasli.core.security.InvalidCredentialException;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.signup.SignupService;
import io.hasli.test.persist.HibernateTestCase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
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
        private AuthenticationService authenticationService;



        @Test
        public void ensureSigningUpAndLoggingInWithSignedUpUserWorks() {
                final User user = new User();
                user.setUsername("Josiah");
                user.setPassword("password1234");

                User u = service.signup(user);
                assertThat(u.getPassword(), is(not("password1234")));
        }


        @Test
        public void ensureAuthenticatingWithRawUserWorks() {

                final User user = new User();
                user.setUsername("Josiah");
                user.setPassword("password1234");

                User u = service.signup(user);
                assertThat(u.getPassword(), is(not("password1234")));

                Token token = authenticationService.authenticate(user);
                assertThat(token, is(not(nullValue())));
        }

        @Test(expected = InvalidCredentialException.class)
        public void ensureAuthenticatingWithBadPasswordFails() {

                final User user = new User();
                user.setUsername("Josiah");
                user.setPassword("password1");
                service.signup(user);
                User fake = new User();
                fake.setUsername("Josiah");
                fake.setPassword("password");
                authenticationService.authenticate(fake);
        }
}
