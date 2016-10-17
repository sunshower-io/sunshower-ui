package io.hasli.persist.core;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.activation.DataSource;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/**
 * Created by haswell on 10/16/16.
 */
@Configuration
public class DataSourceConfiguration {

    @Bean
    public DataSource createHasliDatasource() throws NamingException {
        return InitialContext.doLookup("java:components/HasliCoreDataSource");
    }

}
