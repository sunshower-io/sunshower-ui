package io.hasli.search.es;

import io.hasli.hal.api.instance.InstanceDescriptor;
import io.hasli.hal.api.instance.NodeConfiguration;
import io.hasli.hal.api.memory.MemoryProfile;
import io.hasli.hal.api.units.ByteUnit;
import io.hasli.hal.aws.instance.EC2InstanceDescriptor;
import io.hasli.hal.aws.instance.EC2InstanceDescriptors;
import io.hasli.search.api.Document;
import io.hasli.search.es.luc.DefaultQueryExtractor;
import io.hasli.search.service.IndexingService;
import io.hasli.search.service.SearchService;
import io.hasli.search.service.compute.ComputeSearchService;
import org.apache.lucene.search.Query;
import org.eclipse.persistence.jaxb.JAXBContextFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import java.io.InputStream;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by haswell on 11/10/16.
 */
@Service
@Transactional
public class DefaultComputeSearchService implements ComputeSearchService {

    @Inject
    private IndexingService indexingService;

    @Inject
    private SearchService<Query> searchService;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void index() {
        Set<InstanceDescriptor> instanceDescriptors = readAws();
        for(InstanceDescriptor instanceDescriptor : instanceDescriptors) {
            entityManager.persist(instanceDescriptor);
        }
        indexingService.index(instanceDescriptors);
    }

    @Override
    public UUID save(NodeConfiguration descriptor) {
        this.entityManager.persist(descriptor);
        return descriptor.getId();
    }

    @Override
    public List<InstanceDescriptor> search(UUID id) {
        NodeConfiguration configuration =
                this.entityManager.find(NodeConfiguration.class, id);

        InstanceDescriptor descriptor = new InstanceDescriptor();
        descriptor.setMemoryProfile(configuration.getMemoryProfile());
        descriptor.setComputeProfile(configuration.getComputeProfile());
        descriptor.setStorageProfile(configuration.getStorageProfile());

        Set<Serializable> search = searchService.search(descriptor,
                new DefaultQueryExtractor())
                .stream()
                .map(Document::getId)
                .collect(Collectors.toSet());
        return entityManager.createQuery("select instance " +
                "from InstanceDescriptor instance " +
                "where instance.id in :ids",
                InstanceDescriptor.class)
                    .setParameter("ids", search).getResultList();
    }


    private Set<InstanceDescriptor> readAws() {
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
            InputStream is = DefaultComputeSearchService.class.getResourceAsStream("/ec2-instances.json");
            StreamSource source = new StreamSource(is);

            EC2InstanceDescriptors descriptors = unmarshaller.unmarshal(
                    source, EC2InstanceDescriptors.class).getValue();

            final Set<InstanceDescriptor> instanceDescriptors =
                    new HashSet<>(descriptors.getDescriptors().size());
            for (EC2InstanceDescriptor descriptor : descriptors.getDescriptors()) {
                final MemoryProfile memoryProfile = new MemoryProfile();
                memoryProfile.setUnit(ByteUnit.Megabyte);
                memoryProfile.setCapacity(((long) descriptor.getMemory()) * 1000);
                final InstanceDescriptor d = new InstanceDescriptor();
                d.setName(descriptor.getName());
                d.setDescription(descriptor.getPrettyName());
                d.setKey(descriptor.getInstanceType());
                d.setMemoryProfile(memoryProfile);
                instanceDescriptors.add(d);
            }
            return instanceDescriptors;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
