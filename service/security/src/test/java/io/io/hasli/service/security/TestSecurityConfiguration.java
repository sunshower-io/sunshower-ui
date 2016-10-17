package io.io.hasli.service.security;

import io.hasli.core.security.CredentialService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by haswell on 10/15/16.
 */
@Configuration
public class TestSecurityConfiguration {

    @Bean
    public CredentialService credentialService() {
        return new TestCredentialService();
    }

    @Bean
    public TestSecureService testService() {
        return new TestSecureService();
    }
}
