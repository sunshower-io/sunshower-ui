package io.hasli.hfs.service;

import io.hasli.hfs.configuration.AgentConfiguration;
import io.hasli.hfs.configuration.PortConfiguration;
import org.eclipse.persistence.jaxb.JAXBContextFactory;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by haswell on 11/9/16.
 */
public class Configurations {

    public static AgentConfiguration read(InputStream inputStream) {
        try {
            JAXBContext context = JAXBContextFactory
                    .createContext(
                            new Class<?>[] {
                                    AgentConfiguration.class,
                                    PortConfiguration.class,
                            },
                            new Properties()
            );

            Unmarshaller unmarshaller = context.createUnmarshaller();
            unmarshaller.setProperty("eclipselink.json.include-root", false);
            unmarshaller.setProperty("eclipselink.media-type", "application/json");
            return unmarshaller.unmarshal(
                    new StreamSource(inputStream),
                    AgentConfiguration.class
            ).getValue();
        } catch (JAXBException e) {
            throw new RuntimeException(e);
        }
    }
}
