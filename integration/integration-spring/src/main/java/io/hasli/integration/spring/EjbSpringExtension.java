package io.hasli.integration.spring;

import javax.ejb.Stateless;
import javax.enterprise.event.Observes;
import javax.enterprise.inject.spi.*;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/**
 * Created by haswell on 10/13/16.
 */
public class EjbSpringExtension implements Extension {

    final InitialContext context;
    public EjbSpringExtension() throws NamingException {
        this.context = new InitialContext();
    }

    public void beforeDiscovery(
            @Observes BeforeBeanDiscovery discovery,
            BeanManager beanManager
    ) throws NamingException {
        this.context.bind("beanmanager", beanManager);
    }

    public void processAnnotatedType(
            @Observes
            @WithAnnotations(Stateless.class)
            ProcessAnnotatedType<?> type,
            BeanManager beanManager
    ) {
    }
}
