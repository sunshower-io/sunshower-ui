package io.hasli.hal.aws.instance;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by haswell on 11/6/16.
 */
@XmlRootElement(name = "descriptors")
public class EC2InstanceDescriptors  {

    @XmlElement
    private List<EC2InstanceDescriptor> descriptors;

    public List<EC2InstanceDescriptor> getDescriptors() {
        return descriptors;
    }

    public void setDescriptors(List<EC2InstanceDescriptor> descriptors) {
        this.descriptors = descriptors;
    }
}
