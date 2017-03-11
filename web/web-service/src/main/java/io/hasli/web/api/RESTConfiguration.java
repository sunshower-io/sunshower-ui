package io.hasli.web.api;

import org.jboss.resteasy.core.Dispatcher;
import org.jboss.resteasy.plugins.spring.OptionalValueBeanFactory;
import org.jboss.resteasy.plugins.spring.SpringBeanProcessor;
import org.jboss.resteasy.spi.Registry;
import org.jboss.resteasy.spi.ResteasyDeployment;
import org.jboss.resteasy.spi.ResteasyProviderFactory;
import org.jboss.resteasy.springmvc.ResteasyHandlerAdapter;
import org.jboss.resteasy.springmvc.ResteasyHandlerMapping;
import org.jboss.resteasy.springmvc.ResteasyNoResourceFoundView;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.view.BeanNameViewResolver;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

import java.util.Map;
import java.util.Properties;
import java.util.logging.Logger;

/**
 * Created by haswell on 3/4/17.
 */
@Configuration
@EnableWebMvc
public class RESTConfiguration {

    static final Logger log = Logger.getLogger(RESTConfiguration.class.getName());

    @Bean(initMethod = "start", destroyMethod = "stop")
    public ResteasyDeployment resteasyDeployment() {
        log.info("Creating REST deployment...");
        ResteasyDeployment resteasyDeployment = new ResteasyDeployment();
        log.info("Successfully created REST deployment");
        return resteasyDeployment;
    }

    @Bean
    public Registry resteasyRegistry(ResteasyDeployment factory) {
        return factory.getRegistry();
    }


    @Bean
    public Dispatcher resteasyDispatcher(ResteasyDeployment deployment) {
        return deployment.getDispatcher();
    }


    @Bean
    public ResteasyProviderFactory resteasyProviderFactory(ResteasyDeployment deployment) {
        return deployment.getProviderFactory();
    }

    @Bean
    public SpringBeanProcessor springBeanProcessor(ResteasyDeployment deployment) {
        return new SpringBeanProcessor(deployment);
    }

    @Bean
    @DependsOn("resteasyDeployment")
    @SuppressWarnings("all")
    public ResteasyHandlerMapping resteasyHandlerMapping(
            ResteasyDeployment deployment,
            ApplicationContext context
    ) {
        final ResteasyHandlerMapping mapping = new ResteasyHandlerMapping(deployment);

        Map<String, HandlerInterceptor> beansOfType = context.getBeansOfType(HandlerInterceptor.class);
        HandlerInterceptor[] interceptors = new HandlerInterceptor[beansOfType.size()];
        int count = 0;
        log.info("Registering handlers...");
        for(HandlerInterceptor interceptor : beansOfType.values()) {
            log.info("Register handler: " + interceptor);
            interceptors[count++] = interceptor;
        }
        mapping.setInterceptors(interceptors);
        return mapping;
    }

    @Bean
    public ResteasyHandlerAdapter resteasyHandlerAdapter(ResteasyDeployment deployment) {
        return new ResteasyHandlerAdapter(deployment);
    }


    @Bean
    public SimpleMappingExceptionResolver exceptionHandlerExceptionResolver() {
        SimpleMappingExceptionResolver resolver = new SimpleMappingExceptionResolver();
        final Properties properties = new Properties();
        properties.put("org.springframework.web.servlet.handler.SimpleMappingExceptionResolver", "resteasy.no.resource.found.view");
        resolver.setExceptionMappings(properties);
        resolver.setExceptionAttribute("exception");
        return resolver;
    }


    @Bean
    public ResteasyNoResourceFoundView resteasyNoResourceFoundView(ResteasyDeployment deployment) {
        ResteasyNoResourceFoundView resteasyNoResourceFoundView = new ResteasyNoResourceFoundView();
        resteasyNoResourceFoundView.setDeployment(deployment);
        return resteasyNoResourceFoundView;
    }

    @Bean
    public BeanNameViewResolver resteasyBeanNameViewResolver() {
        return new BeanNameViewResolver();
    }

}
