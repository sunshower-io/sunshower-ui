package io.hasli.hfs.configuration;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/9/16.
 */
@XmlRootElement
public class PortConfiguration {

    @XmlElement(name = "dns")
    private int dns;

    @XmlElement(name = "http")
    private int http;

    @XmlElement(name = "https")
    private int https;


    public int getDns() {
        return dns;
    }

    public void setDns(int dns) {
        this.dns = dns;
    }

    public int getHttp() {
        return http;
    }

    public void setHttp(int http) {
        this.http = http;
    }

    public int getHttps() {
        return https;
    }

    public void setHttps(int https) {
        this.https = https;
    }
}
