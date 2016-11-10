package io.hasli.search.es;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import io.hasli.hal.api.instance.InstanceDescriptor;
import io.hasli.hal.api.memory.MemoryProfile;
import io.hasli.hal.api.units.ByteUnit;
import io.hasli.hal.aws.instance.EC2InstanceDescriptor;
import io.hasli.hal.aws.instance.EC2InstanceDescriptors;
import io.hasli.search.api.Document;
import io.hasli.search.api.Scanner;
import io.hasli.search.common.scanners.HasliFieldScanner;
import io.hasli.search.es.luc.DefaultQueryExtractor;
import io.hasli.search.es.luc.LuceneFieldMappings;
import io.hasli.search.service.IndexingService;
import io.hasli.search.service.SearchService;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.eclipse.persistence.internal.oxm.schema.model.List;
import org.eclipse.persistence.jaxb.JAXBContextFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 11/5/16.
 */
@ContextConfiguration(
        classes =
                HALProviderSearchServiceTest.class
)
@RunWith(SpringJUnit4ClassRunner.class)
public class HALProviderSearchServiceTest {


    @Bean
    public Analyzer analyzer() {
        return new StandardAnalyzer();
    }

    @Bean
    public Directory directory() {
        return new RAMDirectory();
    }


    @Bean
    public Scanner scanner() {
        return new HasliFieldScanner();
    }

    @Bean
    public IndexingService indexingService(
            Directory directory,
            Scanner scanner,
            Analyzer analyzer
    ) {
        return new HALProviderIndexService(
            scanner,
            directory,
            analyzer,
            new LuceneFieldMappings()
        );
    }

    @Bean
    public SearchService searchService(Directory directory) throws IOException {
        return new HALProviderSearchService(directory);
    }


    @Inject
    private SearchService searchService;

    @Inject
    private IndexingService indexingService;


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
        Set<InstanceDescriptor> descriptors = readAwsCurrent();

        indexingService.index(descriptors);


        InstanceDescriptor memory = new InstanceDescriptor();
        MemoryProfile profile = new MemoryProfile();
        profile.setCapacity(1l);
        profile.setUnit(ByteUnit.Gigabyte);

        memory.setMemoryProfile(profile);
        Set<Document> search = searchService.search(memory,
                new DefaultQueryExtractor());
        assertThat(search.size(), is(18));
    }



    private Set<InstanceDescriptor> readAwsCurrent() {
        try {

            final Map<String, String> properties = new HashMap<>();


            JAXBContext context = JAXBContextFactory
                    .createContext(
                            new Class[]{
                                    List.class,
                                    EC2InstanceDescriptor.class,
                                    EC2InstanceDescriptors.class
                            }, null);


            Unmarshaller unmarshaller = context.createUnmarshaller();
            unmarshaller.setProperty("eclipselink.media-type", "application/json");
            unmarshaller.setProperty("eclipselink.json.include-root", false);
            StreamSource source = new StreamSource(ClassLoader.getSystemResourceAsStream("ec2-instances.json"));

            EC2InstanceDescriptors descriptors = unmarshaller.unmarshal(
                    source, EC2InstanceDescriptors.class).getValue();

            final Set<InstanceDescriptor> instanceDescriptors =
                    new HashSet<>(descriptors.getDescriptors().size());
            for (EC2InstanceDescriptor descriptor : descriptors.getDescriptors()) {
                final MemoryProfile memoryProfile = new MemoryProfile();
                memoryProfile.setUnit(ByteUnit.Megabyte);
                memoryProfile.setCapacity(((long) descriptor.getMemory()) * 1000);
                final InstanceDescriptor d = new InstanceDescriptor();
                d.setMemoryProfile(memoryProfile);
                instanceDescriptors.add(d);
            }
            return instanceDescriptors;
        } catch(Exception ex) {

        }
        return null;
    }


    private AWSCredentials getCredentials() {
        return new BasicAWSCredentials(
                "AKIAIFJ27HM6XGUVTNWQ",
                "rgVTl5kP5+3U3IaDUtP1MDNvX9mdUG9dK6vgDD3Q"
        );

    }

}