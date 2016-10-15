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
        System.out.println("COOOOOOL");
    }
    @Bean
    public CredentialAuthenticationService credentialAuthenticationService() {
        System.out.println("BEANS COOOOOOL");
        return new CredentialAuthenticationService();
    }

}
