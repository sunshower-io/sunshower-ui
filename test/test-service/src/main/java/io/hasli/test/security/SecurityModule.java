package io.hasli.test.security;

import io.hasli.barometer.Listeners;
import io.hasli.barometer.Module;
import io.hasli.common.rs.MoxyProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by haswell on 11/2/16.
 */
@Module
@Listeners(
        ContextExecutionListener.class
)
@Configuration
public class SecurityModule {

    @Bean
    public MoxyProvider provider() {
        return new MoxyProvider();

    }

}
