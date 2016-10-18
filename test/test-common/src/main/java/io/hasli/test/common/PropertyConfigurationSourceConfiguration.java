package io.hasli.test.common;

import io.hasli.common.configuration.ConfigurationSource;
import io.hasli.common.configuration.MapConfigurationSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.*;
import java.net.URISyntaxException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by haswell on 10/17/16.
 */
@Configuration
public class PropertyConfigurationSourceConfiguration {

    static final Logger logger = Logger.getLogger(
            PropertyConfigurationSourceConfiguration.class.getName());

    @Bean
    public ConfigurationSource configurationSource() throws URISyntaxException, IOException {


        return new MapConfigurationSource(loadProperties(PropertyConfigurationSourceConfiguration
                .class.getClassLoader()));
    }

    private Map<String, String> loadProperties(ClassLoader cl) throws URISyntaxException, IOException {
        final PathMatchingResourcePatternResolver resolver =
                new PathMatchingResourcePatternResolver(ClassLoader.getSystemClassLoader());
        final Resource[] resources = resolver.getResources("classpath*:/properties/**/*.properties");
        final Map<String, String> results = new HashMap<>();
        System.out.println("RESOURCES: " + resources.length);
        for(Resource resource : resources) {

            try (InputStream fis = resource.getInputStream()) {
                logger.log(Level.INFO,
                        "Reading property file: {0}", resource
                );
                final Properties properties = new Properties();
                properties.load(fis);
                for(Enumeration<Object> keys =
                    properties.keys(); keys.hasMoreElements();) {
                    final String key = Objects.toString(keys.nextElement());
                    results.put(key, properties.getProperty(key));
                }
            } catch (Exception ex) {
                logger.log(Level.WARNING,
                        "Failed to load property file {0}.  Reason:{1}",
                        new Object[]{
                                resource,
                                ex.getMessage(),
                        });
            }
        }
        return results;

    }
}
