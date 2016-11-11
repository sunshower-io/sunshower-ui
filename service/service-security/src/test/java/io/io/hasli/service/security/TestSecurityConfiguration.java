package io.io.hasli.service.security;

import io.hasli.core.security.CredentialService;
import io.hasli.test.security.rs.MoxyOverrideProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by haswell on 10/15/16.
 */
@Configuration
public class TestSecurityConfiguration {

    @Bean
    public MoxyOverrideProvider overrideProvider() {
        return new MoxyOverrideProvider();

    }

    @Bean
    public CredentialService credentialService() {
        return new TestCredentialService();
    }

    @Bean
    public TestSecureService testService() {
        return new TestSecureService();
    }
}
