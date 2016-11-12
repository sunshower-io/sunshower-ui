package io.hasli.hfs.configuration;

import io.hasli.hfs.api.Node;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by haswell on 11/9/16.
 */
@XmlRootElement
public class BootstrapConfiguration {

    @XmlElement(name = "nodes")
    private Set<String> addresses;


    public BootstrapConfiguration() {
        this.addresses = new HashSet<>();
    }

    public Set<Node> getNodes() {
        return this.addresses.stream()
                .map(Node::new)
                .collect(Collectors.toSet());
    }

    public void addNode(Node node) {
        this.addresses.add(node.getAddress().toString());
    }

    public void removeNode(Node node) {
        this.addresses.remove(node.getAddress().toString());
    }
}
