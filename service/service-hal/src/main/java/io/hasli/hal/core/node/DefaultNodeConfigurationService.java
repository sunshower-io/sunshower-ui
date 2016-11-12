package io.hasli.hal.core.node;

import io.hasli.hal.api.instance.NodeConfiguration;
import io.hasli.hal.api.instance.NodeConfigurationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.UUID;

/**
 * Created by haswell on 11/6/16.
 */
@Service
@Transactional
public class DefaultNodeConfigurationService implements NodeConfigurationService {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public UUID save(NodeConfiguration configuration) {
        entityManager.persist(configuration);
        return configuration.getId();
    }

    @Override
    public List<NodeConfiguration> list() {
        return entityManager.createQuery(
                "select configuration from NodeConfiguration configuration",
                NodeConfiguration.class
        ).getResultList();
    }

    @Override
    public NodeConfiguration get(UUID id) {
        return entityManager.find(NodeConfiguration.class, id);
    }



}
