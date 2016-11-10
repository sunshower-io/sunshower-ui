package io.hasli.hfs.service;

import io.hasli.barometer.Enable;
import io.hasli.barometer.rpc.Remote;
import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.hfs.agent.AgentService;
import io.hasli.hfs.api.FilesystemService;
import io.hasli.hfs.api.ObjectDescriptor;
import io.hasli.hfs.configuration.AgentConfiguration;
import io.hasli.model.core.deployment.ApplicationDescriptor;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.service.security.SecurityConfiguration;
import io.hasli.test.persist.EnableJPA;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.core.IsNull.nullValue;
import static org.junit.Assert.assertThat;


/**
 * Created by haswell on 11/8/16.
 */

@EnableJPA
@Enable(JAXRS.class)
@RunWith(BarometerRunner.class)
@ContextConfiguration(
        classes = {
                HFSConfiguration.class,
                SecurityConfiguration.class,
                HibernateConfiguration.class,
                TestConfiguration.class
        })
@WebAppConfiguration
public class HFSFilesystemServiceTest {

    @Remote
    private FilesystemService service;

    @Remote
    private AgentService agentService;

    @Test
    public void ensureAgentServiceIsInjected() {
        assertThat(agentService, is(not(nullValue())));
    }


    @Test
    public void ensureAgentServiceCanBeSaved() {
        final AgentConfiguration configuration =
                Configurations.read(
                        ClassLoader.getSystemResourceAsStream(
                                "hasli.properties.json"));
        agentService.save(configuration);
    }

    @Test
    public void ensureFilesystemIsInjected() {
        assertThat(service, is(not(nullValue())));
    }
    
    @Test
    public void ensureUploadWorks() {
        final AgentConfiguration configuration =
                Configurations.read(
                        ClassLoader.getSystemResourceAsStream(
                                "hasli.properties.json"));
        agentService.save(configuration);
        ApplicationDescriptor descriptor = service.uploadApplication(
                ClassLoader.getSystemResourceAsStream("packages/temp.zip")
        );
        System.out.println(descriptor);
    }


    @Test
    public void ensureUploadOfApplicationProducesExpectedResults() {


    }


    private InputStream createSaveRequest(String input) {
        return new ByteArrayInputStream(input.getBytes());
    }

}