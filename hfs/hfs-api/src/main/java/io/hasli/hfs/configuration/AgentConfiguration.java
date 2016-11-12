package io.hasli.hfs.configuration;

import io.hasli.hfs.addr.MultiAddress;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/9/16.
 */
@XmlRootElement
public class AgentConfiguration {


    @XmlElement(name = "Values")
    private ConfigurationValues values;

    @XmlElement(name = "ports")
    private PortConfiguration ports;


    @XmlElement
    private BootstrapConfiguration bootstrapConfiguration;

    public AgentConfiguration() {
        this.values = new ConfigurationValues();
        this.ports = new PortConfiguration();
    }

    public PortConfiguration ports() {
        return ports;
    }


    public MultiAddress getAgentAddress() {
        final String bindAddress = System.getenv("HASLI_BIND_ADDRESS");
        if (bindAddress != null && !bindAddress.trim().isEmpty()) {
            final String[] components = bindAddress.split(":");
            final int port;
            if (components.length == 2) {
                port = Integer.parseInt(components[1]);
            } else {
                port = 5001;
            }
            final String ip = components[0];
            return new MultiAddress(
                    String.format(
                            "/ip4/%s/%s/%s",
                            ip,
                            get("agent-protocol", "tcp"),
                            port
            ));

        }


        return new MultiAddress(String.format("/ip4/%s/%s/%s",
                get("agent-ip", "127.0.0.1"),
                get("agent-protocol", "tcp"),
                this.ports.getHttp() == 0 ? 5001 : this.ports.getHttp()

        ));
    }


    public void set(String key, String value) {
        this.values.set(key, value);
    }


    public String get(String key, String defaultValue) {
        final String value = get(key);
        return value == null ? defaultValue : value;
    }


    public String get(String s) {
        return this.values.get(s);

    }
}
