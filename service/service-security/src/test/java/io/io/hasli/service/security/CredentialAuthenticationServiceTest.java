package io.io.hasli.service.security;

import io.hasli.core.security.CredentialService;
import io.hasli.model.core.auth.Role;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.security.TokenAuthenticationFilter;
import io.hasli.service.security.crypto.MessageAuthenticationCode;
import io.hasli.test.persist.HibernateTestCase;
import org.junit.Test;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.container.ContainerRequestContext;

import org.junit.runner.RunWith;

import org.mockito.Mockito;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.ServletTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;


import java.io.IOException;
import java.util.UUID;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import static org.mockito.BDDMockito.given;

/**
 * Created by haswell on 10/11/16.
 */
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
public class CredentialAuthenticationServiceTest extends HibernateTestCase {

    @Inject
    private CredentialService credentialService;

    @Inject
    private TestSecureService testSecureService;

    @Inject
    private TokenAuthenticationFilter tokenAuthenticationFilter;

    @Inject
    private MessageAuthenticationCode messageAuthenticationCode;


    @PersistenceContext
    private EntityManager entityManager;

    @Test
    @Transactional
    public void ensureSayHelloAdminWorks() throws IOException {
        final User user = new User();
        final Role adminRole = new Role("admin", "coolbeans");
        user.addRole(adminRole);
        entityManager.persist(user);
        UUID id = user.getId();
        String token = messageAuthenticationCode.token(id.toString());

        final ContainerRequestContext context = Mockito.mock(ContainerRequestContext.class);
        given(context.getHeaderString(
                TokenAuthenticationFilter.HEADER_KEY))
                .willReturn(token);
        tokenAuthenticationFilter.filter(context);
        testSecureService.sayHelloAdmin();
    }


    @Test
    @Transactional
    public void ensureSayHelloAdminWorksOnRolesAllowedWorks() throws IOException {
        final User user = new User();
        final Role adminRole = new Role("ROLE_ADMIN", "coolbeans");
        user.addRole(adminRole);
        entityManager.persist(user);
        UUID id = user.getId();
        String token = messageAuthenticationCode.token(id.toString());

        final ContainerRequestContext context = Mockito.mock(ContainerRequestContext.class);
        given(context.getHeaderString(
                TokenAuthenticationFilter.HEADER_KEY))
                .willReturn(token);
        tokenAuthenticationFilter.filter(context);
        testSecureService.sayHelloRolesAllowed();
    }

    @Test
    @WithMockUser(
            username = "admin",
            roles = {
                    "user",
                    "admin",
            }
    )
    public void ensureMethodIsProtected() {
        testSecureService.sayHelloAdmin();
    }

    @Test
    @WithMockUser(
            username = "admin",
            authorities = {"ROLE_ADMIN"}
    )
    public void ensureMethodIsProtectedByRolesAllowed() {
        testSecureService.sayHelloRolesAllowed();
    }


    @Test
    @WithMockUser(username = "admin", roles = {"frap"})
    public void ensureMethodIsProtectedByRolesAllowed_denied() {
        try {
            testSecureService.sayHelloRolesAllowed();
            fail("Expected authorization rejection");
        } catch (AccessDeniedException ex) {

        }
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
        } catch (AccessDeniedException ex) {

        }
    }


    @Test
    public void ensureServiceIsInjected() {
        assertThat(credentialService, is(not(nullValue())));
    }


}