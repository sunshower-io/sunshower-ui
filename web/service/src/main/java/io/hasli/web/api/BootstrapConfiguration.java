package io.hasli.web.api;

import io.hasli.service.security.CredentialAuthenticationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by haswell on 10/14/16.
 */
@Configuration
public class BootstrapConfiguration {

    public BootstrapConfiguration() {
    }


    @Bean
    public CredentialAuthenticationService credentialAuthenticationService() {
        return new CredentialAuthenticationService();
    }

}
