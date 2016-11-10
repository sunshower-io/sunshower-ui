package io.hasli.hal.api.instance;

import io.hasli.hal.api.compute.ComputeProfile;
import io.hasli.hal.api.cost.CostProfile;
import io.hasli.hal.api.memory.MemoryProfile;
import io.hasli.hal.api.network.NetworkProfile;
import io.hasli.hal.api.providers.Provider;
import io.hasli.hal.api.storage.StorageProfile;
import io.hasli.model.core.DistributableEntity;
import io.hasli.model.core.Metadata;
import io.hasli.search.api.Index;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


/**
 * Created by haswell on 11/5/16.
 */
@Entity
@XmlRootElement
@Table(name = "INSTANCE_DESCRIPTOR")
public class InstanceDescriptor extends DistributableEntity {


    @Basic
    @XmlAttribute
    private String name;

    @Basic
    @XmlAttribute
    private String key;

    @Basic
    @XmlAttribute
    private String description;

    @Transient
    @XmlElement
    private Provider provider;

//    @OneToOne
    @Transient
    @XmlElement
    private Metadata metadata;

    @XmlElement
    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(
            name = "cost_profile_id"
    )
    private CostProfile costProfile;

    @Index
    @XmlElement
    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "storage_profile_id")
    private StorageProfile storageProfile;

    @Index
    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @XmlElement
    @JoinColumn(
            name = "memory_profile_id"
    )
    private MemoryProfile memoryProfile;



    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @XmlElement
    @JoinColumn(
        name = "network_profile_id"
    )
    private NetworkProfile networkProfile;

    @Index
    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @XmlElement
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

    public StorageProfile getStorageProfile() {
        return storageProfile;
    }

    public void setStorageProfile(StorageProfile storageProfile) {
        this.storageProfile = storageProfile;
    }
}
