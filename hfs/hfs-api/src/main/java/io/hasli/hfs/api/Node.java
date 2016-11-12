package io.hasli.hfs.api;

import io.hasli.hfs.addr.MultiAddress;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/9/16.
 */
@XmlRootElement
public class Node {

    @XmlElement
    private String address;

    public Node() {

    }

    public Node(String address) {
        this.address = address;
    }


    public MultiAddress getAddress() {
        return new MultiAddress(address);
    }
}
