package io.hasli.hal.aws.instance;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/5/16.
 */
@XmlRootElement(name = "vpc")
public class VpcDetails {

    @XmlElement(name = "ips_per_eni")
    private int ipsPerElasticNetworkInterface;

    @XmlElement(name = "max_enis")
    private int maxElasticNetworkInterfaces;

    public int getIpsPerElasticNetworkInterface() {
        return ipsPerElasticNetworkInterface;
    }

    public void setIpsPerElasticNetworkInterface(int ipsPerElasticNetworkInterface) {
        this.ipsPerElasticNetworkInterface = ipsPerElasticNetworkInterface;
    }

    public int getMaxElasticNetworkInterfaces() {
        return maxElasticNetworkInterfaces;
    }

    public void setMaxElasticNetworkInterfaces(int maxElasticNetworkInterfaces) {
        this.maxElasticNetworkInterfaces = maxElasticNetworkInterfaces;
    }
}
