package io.hasli.model.core.configuration;

import io.hasli.barometer.jaxrs.SerializationAware;
import io.hasli.barometer.jaxrs.SerializationTestCase;

import static org.junit.Assert.*;

/**
 * Created by haswell on 10/26/16.
 */
public class ApplicationConfigurationTest extends SerializationTestCase {

    public ApplicationConfigurationTest() {
        super(SerializationAware.Format.JSON, ApplicationConfiguration.class);
    }

    
}