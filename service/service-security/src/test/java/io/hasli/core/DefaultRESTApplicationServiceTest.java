package io.hasli.core;

import io.hasli.barometer.Enable;
import io.hasli.barometer.rpc.Remote;
import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.model.core.Application;
import io.hasli.model.core.auth.Role;
import io.hasli.model.core.auth.User;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.test.persist.HibernateTestCase;
import io.io.hasli.service.security.TestSecurityConfiguration;
import io.io.hasli.service.security.web.RESTSecurityTest;
import org.hamcrest.Matcher;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.Set;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 10/26/16.
 */
@Enable(JAXRS.class)
@RunWith(BarometerRunner.class)
@ContextConfiguration(
        classes = {
                JAXRS.class,
                SecurityConfiguration.class,
                HibernateConfiguration.class,
                TestSecurityConfiguration.class,
                RESTSecurityTest.class,
        })
@WebAppConfiguration
public class DefaultRESTApplicationServiceTest extends HibernateTestCase {

    @Remote
    private ApplicationService applicationService;


    @Test
    public void ensureServiceIsInjected() {
        assertThat(applicationService, is(not(nullValue())));
    }

    @Test
    public void ensureInitializationWorksForREST() {
        Application app = new Application();
        final User u = new User();
        u.setUsername("Josiah");
        u.setPassword("Haswell");
        u.setEmailAddress("josiah@hasli.io");

        app.addAdministrator(u);
        applicationService.initialize(app);
        assertThat(applicationService.getAdministrators().size(), is(1));

        Set<User> admins = applicationService.getAdministrators();
        User admin = admins.iterator().next();
        assertThat(admin.getAuthorities().size(), is(1));
        Role r = (Role) admin.getAuthorities().iterator().next();
        assertThat(r.getAuthority(), is("system-administrator"));
    }



}
