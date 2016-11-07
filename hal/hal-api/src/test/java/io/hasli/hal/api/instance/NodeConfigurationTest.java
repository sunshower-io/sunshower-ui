package io.hasli.hal.api.instance;

import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.hal.api.compute.ComputeProfile;
import io.hasli.hal.api.cost.CostProfile;
import io.hasli.hal.api.memory.MemoryProfile;
import io.hasli.hal.api.network.NetworkProfile;
import io.hasli.hal.api.software.SoftwareProfile;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.test.persist.EnableJPA;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


/**
 * Created by haswell on 11/6/16.
 */
@EnableJPA
@ContextConfiguration(
        classes = HibernateConfiguration.class
)
@Transactional
@RunWith(BarometerRunner.class)
public class NodeConfigurationTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    public void ensureNodeConfigurationCanBeSaved() {
        final NodeConfiguration nodeConfiguration = new NodeConfiguration();
        nodeConfiguration.setMemoryProfile(new MemoryProfile());
        nodeConfiguration.setComputeProfile(new ComputeProfile());
        nodeConfiguration.setCostProfile(new CostProfile());
        nodeConfiguration.setNetworkProfile(new NetworkProfile());
        nodeConfiguration.setSoftwareProfile(new SoftwareProfile());
        entityManager.persist(nodeConfiguration);
        entityManager.flush();
    }

}