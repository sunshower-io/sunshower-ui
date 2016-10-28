package io.hasli.service.security;

import io.hasli.core.security.AuthenticationService;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.signup.SignupService;
import io.io.hasli.service.security.TestSecurityConfiguration;
import org.junit.Ignore;
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

import javax.inject.Inject;

import static org.junit.Assert.*;

/**
 * Created by haswell on 10/24/16.
 */
@Ignore
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
        classes = {
                SecurityConfiguration.class,
                HibernateConfiguration.class,
                TestSecurityConfiguration.class
        })


@TestExecutionListeners(listeners = {
        ServletTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        DependencyInjectionTestExecutionListener.class,
        WithSecurityContextTestExecutionListener.class
})
public class DefaultAuthenticationServiceTest {

    @Inject
    private SignupService signupService;

    @Inject
    private AuthenticationService authenticationService;

    @Test
    public void ensureAuthenticationWorks() {

    }


}