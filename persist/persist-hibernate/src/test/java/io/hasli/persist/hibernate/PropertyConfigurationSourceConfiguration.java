package io.hasli.persist.hibernate;

import io.hasli.common.configuration.ConfigurationSource;
import io.hasli.common.configuration.MapConfigurationSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
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
    public ConfigurationSource configurationSource() {

        final File file = new File(ClassLoader
                .getSystemResource("properties").getFile()
        );

        return new MapConfigurationSource(loadProperties(file));
    }

    private Map<String, String> loadProperties(File file) {
        if (!file.exists()) {
            throw new IllegalArgumentException(String.format(
                    "Error: file '%s' does not exist", file.getAbsolutePath()));
        }

        if (!file.isDirectory()) {
            throw new IllegalArgumentException(String.format(
                    "Error: file '%s' is not a directory", file.getAbsolutePath()));
        }

        Map<String, String> results = new HashMap<>();
        Arrays.stream(Objects.requireNonNull(file).listFiles(f ->
                f.getName().endsWith(".properties")))
                .forEach(f -> {
                    try (InputStream fis = new BufferedInputStream(new FileInputStream(f))) {
                        logger.log(Level.INFO,
                                "Reading property file: {0}", f.getAbsolutePath()
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
                                        file.getAbsolutePath(),
                                        ex.getMessage(),
                        });
                    }
                });
        return results;

    }
}
