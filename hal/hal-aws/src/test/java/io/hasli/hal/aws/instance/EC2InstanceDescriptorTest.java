package io.hasli.hal.aws.instance;

import org.eclipse.persistence.jaxb.JAXBContextFactory;
import org.junit.Test;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

/**
 * Created by haswell on 11/5/16.
 */

public class EC2InstanceDescriptorTest {

    @Test
    public void ensureParsingFileWorks() throws JAXBException {
        final Map<String, String> properties = new HashMap<>();


        JAXBContext context = JAXBContextFactory
                .createContext(
                new Class[]{
                        List.class,
                        EC2InstanceDescriptor.class,
                        EC2InstanceDescriptors.class
                }, null);


        Unmarshaller unmarshaller = context.createUnmarshaller();
        unmarshaller.setProperty("eclipselink.media-type", "application/json");
        unmarshaller.setProperty("eclipselink.json.include-root", false);
        StreamSource source = new StreamSource(ClassLoader.getSystemResourceAsStream("ec2-instances.json"));

        EC2InstanceDescriptors descriptors = unmarshaller.unmarshal(
                source, EC2InstanceDescriptors.class).getValue();

        for(EC2InstanceDescriptor descriptor : descriptors.getDescriptors()) {
            System.out.println(descriptor.getInstanceType());
            System.out.println(descriptor.getPrettyName());
        }

    }

}