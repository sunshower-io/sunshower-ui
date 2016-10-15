package io.io.hasli.service.security;

import io.hasli.core.security.CredentialService;
import io.hasli.service.security.SecurityConfiguration;
import org.junit.Test;

import javax.inject.Inject;

import org.junit.runner.RunWith;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import io.hasli.service.security.CredentialAuthenticationService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.ServletTestExecutionListener;


import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

/**
 * Created by haswell on 10/11/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
        classes = {
                SecurityConfiguration.class,
                TestSecurityConfiguration.class
        })


@TestExecutionListeners(listeners = {ServletTestExecutionListener.class,
        DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        WithSecurityContextTestExecutionListener.class})
public class CredentialAuthenticationServiceTest {

    @Inject
    private CredentialService credentialService;

    @Inject
    private TestSecureService testSecureService;

    @Test
    @WithMockUser(username = "admin", roles = {"user", "admin"})
    public void ensureMethodIsProtected() {
        testSecureService.sayHelloAdmin();
    }

    @Test
    @WithMockUser(
            username = "admin",
            roles = {"notadmin"}
    )
    public void ensureMethodIsDenied() {
        try {
            testSecureService.sayHelloAdmin();
            fail("Was supposed to get an access denied exception");
        } catch(AccessDeniedException ex) {

        }
    }


    @Test
    public void ensureServiceIsInjected() {
        assertThat(credentialService, is(not(nullValue())));
    }


}
