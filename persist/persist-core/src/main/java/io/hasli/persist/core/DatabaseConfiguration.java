package io.hasli.persist.core;

import io.hasli.persistence.Dialect;
import io.hasli.persistence.UnsupportedDatabaseException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.inject.Singleton;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Created by haswell on 10/17/16.
 */
@Configuration
public class DatabaseConfiguration {

    @Bean
    @Singleton
    public Dialect databaseDialect(DataSource dataSource) throws SQLException {
        try (final Connection cnx = dataSource.getConnection()){
            final String name = cnx.getMetaData().getDatabaseProductName().toLowerCase();
            switch(name) {
                case "h2":
                    return Dialect.H2;
                case "postgresql":
                    return Dialect.Postgres;
            }
            throw new UnsupportedDatabaseException("Hasli does not support the database: " + name);
        }
    }
}
