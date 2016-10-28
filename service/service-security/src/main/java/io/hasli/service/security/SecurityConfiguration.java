package io.hasli.service.security;

import io.hasli.core.ApplicationService;
import io.hasli.core.security.AuthenticationService;
import io.hasli.core.security.RoleService;
import io.hasli.core.security.UserService;
import io.hasli.core.security.crypto.EncryptionService;
import io.hasli.service.application.DefaultApplicationService;
import io.hasli.service.security.crypto.InstanceSecureKeyGenerator;
import io.hasli.service.security.crypto.MessageAuthenticationCode;
import io.hasli.service.security.crypto.StrongEncryptionService;
import io.hasli.service.security.jaxrs.ExceptionMappings;
import io.hasli.service.security.user.DefaultUserService;
import io.hasli.service.signup.SignupService;
import io.hasli.vault.api.KeyProvider;
import org.jasypt.util.text.BasicTextEncryptor;
import org.jasypt.util.text.TextEncryptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    public RoleService roleService() {
        return new DefaultRoleService();
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

    @Bean
    public SignupService signupService() {
        return new DefaultSignupService();
    }

    @Bean
    public EncryptionService encryptionService() {
        return new StrongEncryptionService();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationService authenticationService() {
        return new DefaultAuthenticationService();
    }

    @Bean
    public TextEncryptor textEncryptor(KeyProvider keyProvider) {
        final BasicTextEncryptor result = new BasicTextEncryptor();
        result.setPassword(keyProvider.getKey());
        return result;
    }


    @Bean
    public ExceptionMappings exceptionMappings() {
        return new ExceptionMappings();
    }


    @Bean
    public ApplicationService applicationService() {
        return new DefaultApplicationService();
    }
}
