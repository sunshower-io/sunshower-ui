package io.io.hasli.service.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by haswell on 10/15/16.
 */
@Configuration
public class TestSecurityConfiguration {

    @Bean
    public TestSecureService testService() {
        return new TestSecureService();
    }
}
