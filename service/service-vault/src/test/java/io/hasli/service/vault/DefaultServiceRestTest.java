package io.hasli.service.vault;

import io.hasli.barometer.Enable;
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
import io.hasli.vault.api.VaultService;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.ws.rs.client.ClientRequestFilter;

/**
 * Created by haswell on 11/1/16.
 */
@EnableJPA
@Enable(JAXRS.class)
@RunWith(BarometerRunner.class)
@ContextConfiguration(
        classes = {
                JAXRS.class,
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

    @Test
    public void ensureServiceIsInjected() {
        assertThat(vaultService, is(not(nullValue())));

    }

    @Test
    public void ensureSavingCredentialViaRESTWorks() {
        User user = new User();
        user.setEmailAddress("josiah.haswell@gmail.com");
        user.setUsername("Josiah");
        user.setPassword("joe");
        signupService.signup(user);
    }


}
