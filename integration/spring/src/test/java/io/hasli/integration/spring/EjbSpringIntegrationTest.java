package io.hasli.integration.spring;

import io.hasli.spi.Integrator;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.jboss.shrinkwrap.api.ArchivePaths;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.ClassLoaderAsset;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.impl.base.asset.AssetUtil;
import org.jboss.util.platform.Java;
import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import test.ejb.EjbService;
import test.spring.SpringConfiguration;
import test.spring.SpringService;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.BeanManager;
import javax.inject.Inject;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import java.io.File;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import static org.mockito.Mockito.when;

/**
 * Created by haswell on 10/13/16.
 */
@RunWith(Arquillian.class)
public class EjbSpringIntegrationTest {




    @Inject
    private EjbService ejbService;

    @Inject
    private EjbSpringIntegrationPoint integrator;

//    @Inject
//    private BeanManager manager;


    @Deployment
    public static JavaArchive createDeployment() {
        return ShrinkWrap.create(JavaArchive.class, "test.jar")
                .addClass(EjbService.class)
                .addClass(Integrator.class)
                .addClass(SpringService.class)
                .addClass(SpringConfiguration.class)
                .addClass(EjbSpringIntegrationPoint.class)
                .addClass(EjbSpringIntegrationTest.class)
                .addPackage("javax.naming")
                .addAsManifestResource("MANIFEST.MF")
                .addAsManifestResource(EmptyAsset.INSTANCE, ArchivePaths.create("beans.xml"));

    }


    static File file(String path) {
        return new File(ClassLoader.getSystemResource(path).getFile());
    }

    @Test
    public void ensureCreatingIcWorks() throws NamingException {
        InitialContext ctx = new InitialContext();
        assertNotNull("Must be able to create initial context", ctx);
    }


    @Test
    public void ensureServiceIsInjected() {
        assertThat(ejbService, is(not(nullValue())));
    }

}
