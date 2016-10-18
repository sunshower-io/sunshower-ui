package io.hasli.service.security;

import io.hasli.core.security.CredentialService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import javax.inject.Inject;
import javax.inject.Singleton;

/**
 * Created by haswell on 10/15/16.
 */
@Configuration
@EnableGlobalMethodSecurity(
        prePostEnabled = true,
        jsr250Enabled = true
)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Inject
    private CredentialService credentialService;




    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(credentialService);
    }

    @Bean
    @Singleton
    public CredentialService credentialService() {
        return new CredentialAuthenticationService();
    }
}
