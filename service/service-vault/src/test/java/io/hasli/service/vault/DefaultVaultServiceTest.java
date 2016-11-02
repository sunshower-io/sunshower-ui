package io.hasli.service.vault;

import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.test.persist.EnableJPA;
import io.hasli.test.persist.HibernateTestCase;
import io.hasli.vault.api.Secret;
import io.hasli.vault.api.VaultService;
import io.hasli.vault.api.secrets.CredentialSecret;
import org.junit.Ignore;
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
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.UUID;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

/**
 * Created by haswell on 11/1/16.
 */
@RunWith(BarometerRunner.class)
@ContextConfiguration(
        classes = {
                HibernateConfiguration.class,
                VaultConfiguration.class,
                SecurityConfiguration.class,
        })

@EnableJPA
@TestExecutionListeners(listeners = {
        ServletTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        DependencyInjectionTestExecutionListener.class,
        WithSecurityContextTestExecutionListener.class
})
@Transactional
public class DefaultVaultServiceTest {

    @Inject
    private VaultService vaultService;

    @PersistenceContext
    private EntityManager entityManager;


    @Test
    public void ensureVaultServiceIsInjected() {
        assertThat(vaultService, is(not(nullValue())));
    }

    @Test
    public void ensureVaultServiceCanPersistSecret() {
        Secret secret = new CredentialSecret();
        vaultService.save(secret);
    }

    @Test
    @Rollback
    @Ignore("Failing when running entire test suite with gradle clean build, need to investigate")
    public void ensureSecretCanBePersistedWithAllProperties() {
        User user = new User();
        user.setUsername("Josiah");
        user.setEmailAddress("jhaswell@gmail.com");


        entityManager.persist(user);

        CredentialSecret secret = new CredentialSecret();
        secret.setModifier(user);
        secret.set("hello", "world");

        vaultService.save(secret);

        UUID id = secret.getId();

        System.out.println(id);

        CredentialSecret s = entityManager.find(CredentialSecret.class, id);
        assertThat(s.getModifier(), is(not(nullValue())));
        assertThat(s.getMetadata(), is(not(nullValue())));
        assertThat(s.getMetadata().get("hello"), is("world"));
    }
}
