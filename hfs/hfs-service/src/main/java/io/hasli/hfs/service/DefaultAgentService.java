package io.hasli.hfs.service;

import io.hasli.hfs.agent.AgentService;
import io.hasli.hfs.api.SwarmService;
import io.hasli.hfs.configuration.AgentConfiguration;

import javax.inject.Inject;

/**
 * Created by haswell on 11/9/16.
 */
public class DefaultAgentService implements AgentService {

    @Inject
    private SwarmService swarmService;


    @Override
    public AgentConfiguration get() {
        return swarmService.getConfiguration();
    }

    @Override
    public AgentConfiguration save(AgentConfiguration input) {
        this.swarmService.setConfiguration(input);
        return input;
    }

}
