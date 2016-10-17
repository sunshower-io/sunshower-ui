package io.hasli.persist.core;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/**
 * Created by haswell on 10/16/16.
 */
@Configuration
public class DataSourceConfiguration {

    @Bean
    public DataSource createHasliDatasource() throws NamingException {
        DataSource result = InitialContext.doLookup("java:jboss/datasources/ExampleDS");
        for(int i = 0; i < 100; i++) {
            System.out.println("GOT A ");
        }
        return result;
    }

}
