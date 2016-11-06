package io.hasli.hal.api.instance;

import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.persist.hibernate.HibernateConfiguration;
import io.hasli.test.persist.EnableJPA;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.junit.Assert.*;

/**
 * Created by haswell on 11/5/16.
 */
@EnableJPA
@ContextConfiguration(
        classes = HibernateConfiguration.class
)
@Transactional
@RunWith(BarometerRunner.class)
public class InstanceDescriptorTest {


    @PersistenceContext
    private EntityManager entityManager;


    @Test
    public void ensureSavingInstanceDescriptorWorks() {

        final InstanceDescriptor descriptor =
                new InstanceDescriptor();

        this.entityManager.persist(descriptor);
        entityManager.flush();

    }

}