package io.hasli.st.common;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.core.IsNull.nullValue;
import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 10/16/16.
 */
public class EnvironmentTest {


    @Test
    public void ensureEnvironmentIsConfigured() {
        String path = System.getProperty("wildfly.home");
        assertThat(path, is(not(nullValue())));
    }

}
