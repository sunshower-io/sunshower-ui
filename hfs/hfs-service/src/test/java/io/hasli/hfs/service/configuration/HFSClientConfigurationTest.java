package io.hasli.hfs.service.configuration;

import io.hasli.barometer.jaxrs.SerializationAware;
import io.hasli.barometer.jaxrs.SerializationTestCase;
import io.hasli.hfs.configuration.AgentConfiguration;
import io.hasli.hfs.configuration.ConfigurationValues;
import io.hasli.hfs.configuration.PortConfiguration;
import org.junit.Test;

import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.*;

/**
 * Created by haswell on 11/9/16.
 */
public class HFSClientConfigurationTest extends SerializationTestCase {

    public HFSClientConfigurationTest() {
        super(
                SerializationAware.Format.JSON,
                AgentConfiguration.class,
                ConfigurationValues.class,
                PortConfiguration.class
        );
    }


    @Test
    public void ensureClientConfigurationCanBeParsedFromJsonFile() throws JAXBException {

        Unmarshaller unmarshaller = SerializationAware.createUnmarshaller(
                SerializationAware.Format.JSON,
                AgentConfiguration.class
        );
        unmarshaller.setProperty("eclipselink.json.include-root", false);

        final StreamSource source = new StreamSource(
                ClassLoader.getSystemResourceAsStream("hasli.properties.json")
        );
        AgentConfiguration configuration =
                unmarshaller.unmarshal(source,
                        AgentConfiguration.class)
                        .getValue();
        String result = configuration.get("data-directory");
        assertThat(configuration.ports().getDns(), is(8600));
    }
}