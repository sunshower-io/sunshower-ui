package io.hasli.st.security;

import io.hasli.model.core.auth.Details;
import io.hasli.model.core.auth.Permission;
import io.hasli.model.core.auth.Role;
import io.hasli.model.core.auth.User;
import io.hasli.model.core.entity.AbstractEntity;
import io.hasli.service.signup.SignupService;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.gradle.archive.importer.embedded.EmbeddedGradleImporter;
import org.jboss.shrinkwrap.api.spec.EnterpriseArchive;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import java.net.URISyntaxException;
import java.net.URL;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 10/18/16.
 */

@RunWith(Arquillian.class)
public class SignupServiceTest {

    @Inject
    private SignupService service;

    @ArquillianResource
    private URL contextPath;



    @Produces
    @ApplicationScoped
    public SignupService createRemoteSignupService() throws URISyntaxException {
        final Client client =
                ClientBuilder.newClient();
        final ResteasyWebTarget target =
                (ResteasyWebTarget) client.target("http://localhost:8080/hasli/api/v1/");

        final SignupService service =
                target.proxy(SignupService.class);
        return service;
    }


    @Deployment
    public static Archive<?> createArchive() {

        EnterpriseArchive archive = ShrinkWrap.create(
                EmbeddedGradleImporter.class, "hasli-site.ear")
                .forProjectDirectory("../../web/hasli.io")
                .useDefaultDistribution()
                .forTasks("ear")
                .importBuildOutput()
                .as(EnterpriseArchive.class);

        JavaArchive testArchive =
                ShrinkWrap.create(JavaArchive.class)
                .addClass(SignupServiceTest.class)
                .addClass(SignupService.class)
                .addPackage(AbstractEntity.class.getPackage())
                .addClass(User.class)
                .addClass(UserDetails.class)
                .addClass(Role.class)
                .addClass(Permission.class)
                .addClass(GrantedAuthority.class)
                .addClass(Details.class)
                .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");

        archive.addAsLibraries(testArchive);
        return archive;
    }



    @Test
    public void ensureProxyServiceIsInjected() {
        assertThat(service, is(not(nullValue())));
    }

    @Test
    public void ensureServiceCanSaveUsers() {
        final User u = new User();
        u.setPassword("password");
        u.setUsername("joe");
        final User saved = service.signup(u);
        assertThat(u.getUsername(), is(saved.getUsername()));
    }


}
