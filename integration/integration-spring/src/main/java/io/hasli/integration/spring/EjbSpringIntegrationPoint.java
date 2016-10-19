package io.hasli.integration.spring;

import io.hasli.spi.Integrator;
import org.springframework.context.ApplicationContext;
import org.springframework.context.access.ContextSingletonBeanFactoryLocator;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.ejb.interceptor.SpringBeanAutowiringInterceptor;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.PostActivate;
import javax.ejb.Startup;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.BeanManager;
import javax.enterprise.util.AnnotationLiteral;
import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by haswell on 10/13/16.
 */
@Startup
@Singleton
public class EjbSpringIntegrationPoint extends SpringBeanAutowiringInterceptor {



    static final class IntegratorAnnotation extends AnnotationLiteral<Integrator> {

    }

    static final IntegratorAnnotation IntegratorLiteral
            = new IntegratorAnnotation();

    private final Set<Class> configurations;

    private static final ThreadLocal<ApplicationContext> context = new ThreadLocal<>();


    @Inject
    private BeanManager beanManager;

    public EjbSpringIntegrationPoint() {
        this.configurations = new HashSet<>();

    }

    @PostConstruct
    public void construct() {
        System.out.println("CONSTRUCT");
        this.configurations.addAll(
                beanManager.getBeans(Object.class, IntegratorLiteral)
                        .stream().map(b -> b.getBeanClass())
                        .collect(Collectors.toSet())
        );

        final AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext();
        for (Class<?> type : this.configurations) {
            System.out.println("TYPE" + type);
            context.register(type);
        }
        context.refresh();
        EjbSpringIntegrationPoint.context.set(context);
    }



    @PostActivate
    public void activate() {
//        System.out.println("Activate");
//        ((AnnotationConfigApplicationContext) this.context.get()).refresh();
    }

    @PreDestroy
    public void deactivate() {
//        ((AnnotationConfigApplicationContext) this.context.get()).stop();
    }

    @Produces
    @javax.inject.Singleton
    public ApplicationContext context() {
        return this.context.get();
    }

}
