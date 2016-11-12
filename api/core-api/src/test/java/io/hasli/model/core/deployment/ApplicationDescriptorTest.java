package io.hasli.model.core.deployment;

import io.hasli.barometer.spring.BarometerRunner;
import io.hasli.model.core.Application;
import io.hasli.model.core.crypto.Multihash;
import io.hasli.test.persist.EnableJPA;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by haswell on 11/9/16.
 */
@EnableJPA
@Transactional
@RunWith(BarometerRunner.class)
public class ApplicationDescriptorTest {


    @PersistenceContext
    private EntityManager entityManager;


    @Test
    public void ensureSavingApplicationDescriptorWorks() {
        final ApplicationDescriptor descriptor = new ApplicationDescriptor(
                Multihash.fromBase58("QmNTpDwQHPN4wYUrA4f9xMHZyFVmEzh2PA9HFQa34NUf9q")
        );


        Multihash mh = Multihash.fromBase58("QmNTpDwQHPN4wYUrA4f9xMHZyFVmEzh2PA9HFQa34NUf9j");

        descriptor.setImage(mh);

        entityManager.persist(descriptor);
        entityManager.flush();
        List<Object[]> resultList = entityManager.createQuery("select e.image, e.id from ApplicationDescriptor e").getResultList();
        for(Object[] d : resultList) {
            System.out.println("F" + d[0].toString());
            System.out.println("G" + d[1].toString());
//            System.out.println(new Multihash(d.toBytes()).toString());
        }


    }
}