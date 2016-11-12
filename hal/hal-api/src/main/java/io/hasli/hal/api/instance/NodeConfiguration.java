package io.hasli.hal.api.instance;

import io.hasli.hal.api.OperatingSystem;
import io.hasli.hal.api.compute.ComputeProfile;
import io.hasli.hal.api.cost.CostProfile;
import io.hasli.hal.api.memory.MemoryProfile;
import io.hasli.hal.api.network.NetworkProfile;
import io.hasli.hal.api.security.SecurityGroup;
import io.hasli.hal.api.software.SoftwareProfile;
import io.hasli.hal.api.storage.StorageProfile;
import io.hasli.model.core.DistributableEntity;
import org.eclipse.persistence.oxm.annotations.XmlDiscriminatorValue;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Set;

/**
 * Created by haswell on 11/6/16.
 *
 * A node configuration is the totality of the software that is to be installed on the node
 * as well as any associated security groups, networks, etc.
 *
 * A node configuration plus an instance descriptor results in a deployable instance
 */
@Entity
@XmlRootElement
@Table(name = "NODE_CONFIGURATION")
@XmlDiscriminatorValue("io.hasli.hal.api.instance.NodeConfiguration")
public class NodeConfiguration extends DistributableEntity {


    @Basic
    @XmlElement
    private String name;

    @Basic
    @XmlElement
    private String description;

    @OneToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
        name = "cost_profile_id"
    )
    private CostProfile costProfile;

    @OneToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
        name = "memory_profile_id"
    )
    @XmlElement
    private MemoryProfile memoryProfile;

    @OneToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
        name = "network_profile_id"
    )
    @XmlElement
    private NetworkProfile networkProfile;


    @OneToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
        name = "compute_profile_id"
    )
    @XmlElement
    private ComputeProfile computeProfile;

    @OneToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
        name = "software_profile_id"
    )
    private SoftwareProfile softwareProfile;

    @OneToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "storage_profile_id"
    )
    @XmlElement
    private StorageProfile storageProfile;


    @OneToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
        name = "operating_system_id"
    )
    private OperatingSystem operatingSystem;



    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
        name = "security_group_id"
    )
    private Set<SecurityGroup> securityGroups;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public SoftwareProfile getSoftwareProfile() {
        return softwareProfile;
    }

    public StorageProfile getStorageProfile() {
        return storageProfile;
    }

    public void setStorageProfile(StorageProfile storageProfile) {
        this.storageProfile = storageProfile;
    }

    public void setSoftwareProfile(SoftwareProfile softwareProfile) {
        this.softwareProfile = softwareProfile;
    }

    public OperatingSystem getOperatingSystem() {
        return operatingSystem;
    }

    public void setOperatingSystem(OperatingSystem operatingSystem) {
        this.operatingSystem = operatingSystem;
    }

    public Set<SecurityGroup> getSecurityGroups() {
        return securityGroups;
    }

    public void setSecurityGroups(Set<SecurityGroup> securityGroups) {
        this.securityGroups = securityGroups;
    }

}
