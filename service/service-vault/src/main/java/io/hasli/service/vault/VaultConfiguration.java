package io.hasli.service.vault;

import io.hasli.vault.api.VaultService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by haswell on 11/1/16.
 */
@Configuration
public class VaultConfiguration {

    @Bean
    public VaultService vaultService() {
        return new DefaultVaultService();
    }
}
