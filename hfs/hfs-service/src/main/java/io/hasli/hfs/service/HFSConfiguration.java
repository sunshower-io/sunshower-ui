package io.hasli.hfs.service;

import io.hasli.hfs.agent.AgentService;
import io.hasli.hfs.api.FilesystemService;
import io.hasli.hfs.api.SwarmService;
import io.hasli.hfs.service.HFSClient;
import io.hasli.hfs.service.HFSFilesystemService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.ForkJoinPool;

/**
 * Created by haswell on 11/8/16.
 */
@Configuration
public class HFSConfiguration {

    @Bean
    public SwarmService swarmService() {
        return new DefaultSwarmService();
    }


    @Bean
    public ExecutorService executorService() {
        return new ForkJoinPool();
    }

    @Bean
    public AgentService agentService() {
        return new DefaultAgentService();
    }

    @Bean
    public FilesystemService filesystemService() {
        return new HFSFilesystemService();
    }
}
