package io.hasli.st.security;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.exporter.ZipExporter;
import org.jboss.shrinkwrap.api.gradle.archive.importer.embedded.EmbeddedGradleImporter;
import org.jboss.shrinkwrap.api.spec.EnterpriseArchive;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.Maven;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.File;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 10/16/16.
 */
@RunWith(Arquillian.class)
public class AuthenticationTest {

//    @PersistenceContext
//    private EntityManager entityManager;



    @Deployment
    public static Archive<?> createDeployment() {
        EnterpriseArchive ear =
                ShrinkWrap.create(EmbeddedGradleImporter.class, "hasli-io.ear")
                .forProjectDirectory("../../web/hasli.io")
                .useDefaultDistribution()
                .forTasks("ear")
                .importBuildOutput()
                .as(EnterpriseArchive.class);

        JavaArchive testLibraryHelper =
                ShrinkWrap.create(JavaArchive.class)
                .addClass(AuthenticationTest.class)
                .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
        ear.addAsLibraries(testLibraryHelper);
        return ear;
    }


    @Test
    public void ensureTestRuns() {
        System.out.println("Done");
    }

//    @Test
//    public void ensureEntityManagerIsInjected() {
//        assertThat(entityManager, is(not(nullValue())));
//    }
}
