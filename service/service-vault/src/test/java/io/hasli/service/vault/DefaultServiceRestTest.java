package io.hasli.service.vault;

import io.hasli.barometer.Enable;
import io.hasli.barometer.Select;
import io.hasli.barometer.jaxrs.ClientContext;
import io.hasli.barometer.rpc.Remote;
import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.core.security.UserService;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.service.signup.SignupService;
import io.hasli.test.persist.EnableJPA;
import io.hasli.test.persist.HibernateTestCase;
import io.hasli.test.security.EnableSecurity;
import io.hasli.test.security.rs.AuthenticationDecorator;
import io.hasli.vault.api.Secret;
import io.hasli.vault.api.VaultService;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import io.hasli.vault.api.secrets.CredentialSecret;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.ws.rs.ClientErrorException;
import javax.ws.rs.client.ClientRequestFilter;
import javax.ws.rs.core.Response;

/**
 * Created by haswell on 11/1/16.
 */
@EnableJPA
@EnableSecurity
@Enable(JAXRS.class)
@RunWith(BarometerRunner.class)
@ContextConfiguration(
        classes = {
                VaultConfiguration.class,
                SecurityConfiguration.class,
                HibernateConfiguration.class,
        })
@WebAppConfiguration
public class DefaultServiceRestTest {

    @Remote
    private VaultService vaultService;

    @Remote
    private SignupService signupService;

    @Remote
    @Select("authenticated")
    @ClientContext(
        provider = AuthenticationDecorator.class
    )
    private VaultService authenticatedVaultService;


    @Test
    public void ensureServiceIsInjected() {
        assertThat(vaultService, is(not(nullValue())));
    }

    @Test
    public void ensureSavingCredentialFailsForUnAuthorizedUser() {
        CredentialSecret secret = new CredentialSecret();
        secret.setName("test-secret");
        secret.setSecret("frap");
        secret.setDescription("just a normal secret!");
        secret.setCredential("frap-adap");
        try {
            vaultService.save(secret);
        } catch(ClientErrorException ex) {
            assertThat(ex.getResponse().getStatusInfo(),
                    is(Response.Status.FORBIDDEN
            ));
        }
    }

    @Test
    @WithMockUser(username = "joe")
    public void ensureSavingCredentialAsAuthenticatedAdminWorks() {

        CredentialSecret secret = new CredentialSecret();
        secret.setName("test-secret");
        secret.setSecret("frap");
        secret.setDescription("just a normal secret!");
        secret.setCredential("frap-adap");
        authenticatedVaultService.save(secret);
    }

    @Test
    @WithMockUser("user2")
    public void ensureSavingCredentialWhileAuthenticatedMakesCurrentUserOwnerAsWellAsModifier() {
        CredentialSecret secret = new CredentialSecret();
        secret.setName("test-secret2");
        secret.setSecret("frap");
        secret.setDescription("just a normal secret!");
        secret.setCredential("frap-adap");

        final CredentialSecret s = (CredentialSecret)
                authenticatedVaultService.save(secret);

        User u = s.getModifier();
        assertThat(u, is(not(nullValue())));

    }



}
