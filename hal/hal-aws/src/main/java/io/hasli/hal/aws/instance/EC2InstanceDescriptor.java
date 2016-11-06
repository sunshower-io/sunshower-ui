package io.hasli.hal.aws.instance;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

/**
 * Created by haswell on 11/5/16.
 */
@XmlRootElement
public class EC2InstanceDescriptor {

    @XmlElement(
            name = "enhanced_networking"
    )
    private boolean enhancedNetworking;


    @XmlElement(name = "vCPU")
    private int virtualCpus;

    @XmlElement(name = "ebs_iops")
    private int ebsIops;


    @XmlElement(name = "network_performance")
    private String networkPerformance;

    @XmlElement(name = "ebs_throughput")
    private String ebsThroughput;

    @XmlElement(name = "pretty_name")
    private String prettyName;



    @XmlElement(name = "vpc")
    private VpcDetails vpcDetails;

    @XmlElement(name = "arch")
    private List<String> architectureDetails;


    @XmlElement(name = "vpc_only")
    private boolean vpcOnly;


    @XmlElement(name = "linux_virtualization_types")
    private List<String> linuxVirtualizationTypes;


    @XmlElement(name = "ebs_optimized")
    private boolean ebsOptimized;

    @XmlElement(name = "storage")
    private StorageDetails storageDetails;

    @XmlElement(name = "instance_type")
    private String instanceType;

    @XmlElement(name = "ECU")
    private float elasticComputeUnits;

    @XmlElement(name = "memory")
    private float memory;

    @XmlElement(name = "ebs_max_bandwidth")
    private float ebsMaxBandwidth;

    public String getName() {
        return instanceType;
    }

    public void setName(String name) {
        this.instanceType= name;
    }

    public boolean isEnhancedNetworking() {
        return enhancedNetworking;
    }

    public void setEnhancedNetworking(boolean enhancedNetworking) {
        this.enhancedNetworking = enhancedNetworking;
    }

    public int getVirtualCpus() {
        return virtualCpus;
    }

    public void setVirtualCpus(int virtualCpus) {
        this.virtualCpus = virtualCpus;
    }

    public int getEbsIops() {
        return ebsIops;
    }

    public void setEbsIops(int ebsIops) {
        this.ebsIops = ebsIops;
    }

    public String getNetworkPerformance() {
        return networkPerformance;
    }

    public void setNetworkPerformance(String networkPerformance) {
        this.networkPerformance = networkPerformance;
    }

    public String getEbsThroughput() {
        return ebsThroughput;
    }

    public void setEbsThroughput(String ebsThroughput) {
        this.ebsThroughput = ebsThroughput;
    }

    public String getPrettyName() {
        return prettyName;
    }

    public void setPrettyName(String prettyName) {
        this.prettyName = prettyName;
    }

    public VpcDetails getVpcDetails() {
        return vpcDetails;
    }

    public void setVpcDetails(VpcDetails vpcDetails) {
        this.vpcDetails = vpcDetails;
    }

    public List<String> getArchitectureDetails() {
        return architectureDetails;
    }

    public void setArchitectureDetails(List<String> architectureDetails) {
        this.architectureDetails = architectureDetails;
    }

    public boolean isVpcOnly() {
        return vpcOnly;
    }

    public void setVpcOnly(boolean vpcOnly) {
        this.vpcOnly = vpcOnly;
    }

    public List<String> getLinuxVirtualizationTypes() {
        return linuxVirtualizationTypes;
    }

    public void setLinuxVirtualizationTypes(List<String> linuxVirtualizationTypes) {
        this.linuxVirtualizationTypes = linuxVirtualizationTypes;
    }

    public boolean isEbsOptimized() {
        return ebsOptimized;
    }

    public void setEbsOptimized(boolean ebsOptimized) {
        this.ebsOptimized = ebsOptimized;
    }

    public StorageDetails getStorageDetails() {
        return storageDetails;
    }

    public void setStorageDetails(StorageDetails storageDetails) {
        this.storageDetails = storageDetails;
    }

    public String getInstanceType() {
        return instanceType;
    }

    public void setInstanceType(String instanceType) {
        this.instanceType = instanceType;
    }

    public float getElasticComputeUnits() {
        return elasticComputeUnits;
    }

    public void setElasticComputeUnits(float elasticComputeUnits) {
        this.elasticComputeUnits = elasticComputeUnits;
    }

    public float getMemory() {
        return memory;
    }

    public void setMemory(float memory) {
        this.memory = memory;
    }

    public float getEbsMaxBandwidth() {
        return ebsMaxBandwidth;
    }

    public void setEbsMaxBandwidth(float ebsMaxBandwidth) {
        this.ebsMaxBandwidth = ebsMaxBandwidth;
    }
}
