package io.io.hasli.service.security;

import io.hasli.service.security.FrapService;
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
                .addClass(FrapService.class)
                .addClass(CredentialAuthenticationService.class)
                .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
    }


    @Test
    public void ensureServiceIsInjected() {
        System.out.println(credentialService.sayHello("Frap"));
        assertThat(credentialService, is(not(nullValue())));
    }


}
