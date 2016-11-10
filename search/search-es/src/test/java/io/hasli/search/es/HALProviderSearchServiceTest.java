package io.hasli.search.es;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import io.hasli.barometer.Enable;
import io.hasli.barometer.rpc.Remote;
import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.hal.api.instance.InstanceDescriptor;
import io.hasli.hal.api.instance.NodeConfiguration;
import io.hasli.hal.api.memory.MemoryProfile;
import io.hasli.hal.api.units.ByteUnit;
import io.hasli.search.api.Document;
import io.hasli.search.es.luc.DefaultQueryExtractor;
import io.hasli.search.service.IndexingService;
import io.hasli.search.service.SearchService;
import io.hasli.search.service.compute.ComputeSearchService;
import io.hasli.test.persist.EnableJPA;
import io.hasli.test.security.rs.MoxyOverrideProvider;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Set;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

/**
 * Created by haswell on 11/5/16.
 */
@ContextConfiguration(
        classes ={
                SearchConfiguration.class,
                HALProviderSearchServiceTest.class
        }
)
@Enable(JAXRS.class)
@EnableJPA
@Transactional
@EnableTransactionManagement
@RunWith(BarometerRunner.class)
public class HALProviderSearchServiceTest {

    @Bean
    public MoxyOverrideProvider overrideProvider() {
        return new MoxyOverrideProvider();
    }


    @Inject
    private SearchService searchService;

    @Inject
    private IndexingService indexingService;

    @Inject
    private ComputeSearchService computeSearchService;

    @Remote
    private ComputeSearchService remoteComputeSearchService;

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    @SuppressWarnings("unchecked")
    public void ensureListingAndIndexingAMIsWorks() {
        InstanceDescriptor descriptor =
                new InstanceDescriptor();

        descriptor.setName("test");

        final MemoryProfile memoryProfile = new MemoryProfile();
        memoryProfile.setCapacity(100l);
        memoryProfile.setUnit(ByteUnit.Gigabyte);
        descriptor.setMemoryProfile(memoryProfile);

        indexingService.index(descriptor);

        Set<Document> documents = searchService.search(
                descriptor, new DefaultQueryExtractor());
        assertThat(documents.size(), is(1));
    }



    @Test
    public void ensureReadingAWSJSonWorks() {
        computeSearchService.index();
        InstanceDescriptor memory = new InstanceDescriptor();
        MemoryProfile profile = new MemoryProfile();
        profile.setCapacity(1l);
        profile.setUnit(ByteUnit.Gigabyte);

        memory.setMemoryProfile(profile);
        Set<Document> search = searchService.search(memory,
                new DefaultQueryExtractor());
//        assertThat(search.size(), is(18));
        assertTrue(search.size() > 0);
    }

    @Test
    public void ensureFindingByIdWorks() {

        computeSearchService.index();
        NodeConfiguration memory = new NodeConfiguration();
        MemoryProfile profile = new MemoryProfile();
        profile.setCapacity(1l);
        profile.setUnit(ByteUnit.Gigabyte);
        memory.setMemoryProfile(profile);
        entityManager.persist(memory);
        List<InstanceDescriptor> search =
                computeSearchService.search(memory.getId());
        assertTrue(search.size() > 0);
    }




    @Test
    public void ensureFindingByIdWorks_remote() {

        remoteComputeSearchService.index();
        NodeConfiguration memory = new NodeConfiguration();
        MemoryProfile profile = new MemoryProfile();
        profile.setCapacity(1l);
        profile.setUnit(ByteUnit.Gigabyte);
        memory.setMemoryProfile(profile);
        remoteComputeSearchService.save(memory);

        List<InstanceDescriptor> search =
                remoteComputeSearchService.search(memory.getId());
        assertTrue(search.size() > 0);

    }

    private AWSCredentials getCredentials() {
        return new BasicAWSCredentials(
                "AKIAIFJ27HM6XGUVTNWQ",
                "rgVTl5kP5+3U3IaDUtP1MDNvX9mdUG9dK6vgDD3Q"
        );

    }

}