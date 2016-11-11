package io.hasli.hfs.api;

import javax.xml.bind.annotation.*;

/**
 * Created by haswell on 11/9/16.
 */

@XmlRootElement
@XmlAccessorType(XmlAccessType.NONE)

public class ObjectDescriptor {

    @XmlAttribute
    private String address;

    @XmlAttribute
    private long size;

    public ObjectDescriptor()  {

    }

    public ObjectDescriptor(MerkleNode node) {
        this.address = node.getHash();
        this.size = node.getSize();
    }



    public String getAddress() {
        return address;
    }
}
