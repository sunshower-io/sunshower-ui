package io.hasli.service.security;

import io.hasli.core.security.CredentialService;
import io.hasli.core.security.UserService;
import io.hasli.service.security.crypto.InstanceSecureKeyGenerator;
import io.hasli.service.security.crypto.MessageAuthenticationCode;
import io.hasli.service.security.user.DefaultUserService;
import io.hasli.vault.api.KeyProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

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
    private UserService userService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService((UserDetailsService) userService);
    }

    @Bean
    public UserService userService() {
        return new DefaultUserService();
    }

    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }


    @Bean
    public KeyProvider keyProvider() {
        return new InstanceSecureKeyGenerator();
    }

    @Bean
    @Singleton
    public MessageAuthenticationCode messageAuthenticationCode(KeyProvider keyProvider) {
        return new MessageAuthenticationCode(
                MessageAuthenticationCode.Algorithm.SHA256, keyProvider.getKey());
    }

}
