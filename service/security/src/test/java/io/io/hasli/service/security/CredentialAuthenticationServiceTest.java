package io.io.hasli.service.security;

import org.junit.Test;

import javax.annotation.sql.DataSourceDefinition;
import javax.inject.Inject;
import org.junit.runner.RunWith;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import io.hasli.service.security.CredentialAuthenticationService;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

/**
 * Created by haswell on 10/11/16.
 */

@RunWith(Arquillian.class)
public class CredentialAuthenticationServiceTest {

    @Inject
    private CredentialAuthenticationService credentialService;

    @Deployment
    public static JavaArchive createDeployment() {
        return ShrinkWrap.create(JavaArchive.class)
                .addClass(CredentialAuthenticationService.class)
                .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
    }


    @Test
    public void ensureServiceIsInjected() {
        assertThat(credentialService, is(not(nullValue())));
    }


}
