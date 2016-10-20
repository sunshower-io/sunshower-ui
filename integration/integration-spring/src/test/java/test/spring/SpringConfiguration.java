package test.spring;

import io.hasli.spi.Integrator;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.CommonAnnotationBeanPostProcessor;
import org.springframework.context.annotation.Configuration;

import javax.ejb.Stateless;

/**
 * Created by haswell on 10/14/16.
 */
@Stateless
@Integrator
@Configuration
public class SpringConfiguration {


    @Bean
    public SpringService springService() {
        return new SpringService();
    }

    @Bean
    public CommonAnnotationBeanPostProcessor beanPostProcessor() {
        CommonAnnotationBeanPostProcessor processor =
                new CommonAnnotationBeanPostProcessor();
        processor.setAlwaysUseJndiLookup(true);
        return processor;
    }

}
