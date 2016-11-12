package io.hasli.hfs.configuration;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by haswell on 11/11/16.
 */
public class AgentConfigurationTest {

    @Test
    public void ensureAgentMultiaddressIsCorrect() {
        System.out.println(new AgentConfiguration().getAgentAddress());
    }

}