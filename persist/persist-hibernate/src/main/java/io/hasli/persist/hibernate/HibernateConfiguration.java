package io.hasli.persist.hibernate;

import io.hasli.common.configuration.ConfigurationSource;
import io.hasli.jpa.configuration.Properties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.support.PersistenceAnnotationBeanPostProcessor;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.inject.Singleton;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

/**
 * Created by haswell on 10/16/16.
 */
@Configuration
@EnableTransactionManagement
public class HibernateConfiguration {

    @Bean
    public JpaTransactionManager transactionManager(
            EntityManagerFactory entityManagerFactory
    ) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory);
        return transactionManager;
    }

    @Bean
    public PersistenceAnnotationBeanPostProcessor persistenceAnnotationBeanPostProcessor() {
        return new PersistenceAnnotationBeanPostProcessor();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            DataSource dataSource,
            ConfigurationSource env
    ) {
        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean =
                new LocalContainerEntityManagerFactoryBean();
        entityManagerFactoryBean.setDataSource(dataSource);
        entityManagerFactoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        entityManagerFactoryBean.setPackagesToScan(
                "io.hasli.model.core.auth",
                "io.hasli.model.core"
        );

        java.util.Properties jpaProperties = new java.util.Properties();

        jpaProperties.put("hibernate.dialect",
                env.get(Properties.Dialect, true));

        jpaProperties.put("hibernate.hbm2ddl.auto",
                env.get(Properties.Generate, true));

        jpaProperties.put("hibernate.ejb.naming_strategy",
                env.get(Properties.NamingStrategy, true));

        jpaProperties.put("hibernate.show_sql",
                env.get(Properties.ShowSql, true));

        jpaProperties.put("hibernate.format_sql",
                env.get(Properties.FormatSql, true));
        entityManagerFactoryBean.setJpaProperties(jpaProperties);
        return entityManagerFactoryBean;
    }


}
