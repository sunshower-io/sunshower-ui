package io.hasli.persist.core;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import io.hasli.common.configuration.ConfigurationSource;
import io.hasli.common.configuration.ValueHolder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.inject.Inject;
import javax.sql.DataSource;

/**
 * Created by haswell on 10/16/16.
 */
@Configuration
public class ConfigurationSourceDataSourceConfiguration {

    public enum Keys implements ValueHolder {

        Url("jdbc.url"),
        DriverClass("jdbc.driverClass"),
        Username("jdbc.username"),
        Password("jdbc.password");


        private final String value;

        private Keys(final String value) {
            this.value = value;
        }

        public String value() {
            return value;
        }
    }

    @Bean(destroyMethod = "close")
    public DataSource createDataSource(
            ConfigurationSource source
    ) {
        final String url = source.get(Keys.Url, true);
        final String username = source.get(Keys.Url, true);
        final String password = source.get(Keys.Password, true);
        final String driverClass = source.get(Keys.DriverClass, true);
        final HikariConfig config = new HikariConfig();
        config.setDriverClassName(driverClass);
        config.setUsername(username);
        config.setPassword(password);
        config.setJdbcUrl(url);
        return new HikariDataSource(config);
    }
}
