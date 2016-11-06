package io.hasli.hal.api.instance;

import io.hasli.hal.api.compute.ComputeProfile;
import io.hasli.hal.api.cost.CostProfile;
import io.hasli.hal.api.memory.MemoryProfile;
import io.hasli.hal.api.network.NetworkProfile;
import io.hasli.hal.api.providers.Provider;
import io.hasli.model.core.DistributableEntity;
import io.hasli.model.core.Metadata;
import io.hasli.model.core.entity.AbstractEntity;
import io.hasli.model.core.entity.Persistable;

import javax.inject.Named;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.UUID;


/**
 * Created by haswell on 11/5/16.
 */
@Entity
@XmlRootElement
@Table(name = "INSTANCE_DESCRIPTOR")
public class InstanceDescriptor extends DistributableEntity {

    @Basic
    private String name;

    @Basic
    private String key;

    @Basic
    private String description;

    @ManyToOne
    private Provider provider;

    @OneToOne
    private Metadata metadata;

    @OneToOne
    @JoinColumn(
            name = "cost_profile_id"
    )
    private CostProfile costProfile;

    @OneToOne
    @JoinColumn(
            name = "memory_profile_id"
    )
    private MemoryProfile memoryProfile;

    @OneToOne
    @JoinColumn(
        name = "network_profile_id"
    )
    private NetworkProfile networkProfile;

    @OneToOne
    @JoinColumn(
        name = "compute_profile_id"
    )
    private ComputeProfile computeProfile;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Provider getProvider() {
        return provider;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    public Metadata getMetadata() {
        return metadata;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public CostProfile getCostProfile() {
        return costProfile;
    }

    public void setCostProfile(CostProfile costProfile) {
        this.costProfile = costProfile;
    }

    public MemoryProfile getMemoryProfile() {
        return memoryProfile;
    }

    public void setMemoryProfile(MemoryProfile memoryProfile) {
        this.memoryProfile = memoryProfile;
    }

    public NetworkProfile getNetworkProfile() {
        return networkProfile;
    }

    public void setNetworkProfile(NetworkProfile networkProfile) {
        this.networkProfile = networkProfile;
    }

    public ComputeProfile getComputeProfile() {
        return computeProfile;
    }

    public void setComputeProfile(ComputeProfile computeProfile) {
        this.computeProfile = computeProfile;
    }
}
