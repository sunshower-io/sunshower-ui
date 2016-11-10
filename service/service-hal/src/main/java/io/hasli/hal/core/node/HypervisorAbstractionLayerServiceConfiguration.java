package io.hasli.hal.core.node;

import io.hasli.hal.api.instance.NodeConfigurationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by haswell on 11/6/16.
 */
@Configuration
public class HypervisorAbstractionLayerServiceConfiguration {

    @Bean
    public NodeConfigurationService nodeConfigurationService() {
        return new DefaultNodeConfigurationService();
    }
}
