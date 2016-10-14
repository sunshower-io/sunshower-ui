package io.hasli.integration.spring;

import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.spi.InitialContextFactory;
import java.util.Hashtable;

/**
 * Created by haswell on 10/14/16.
 */
public class BeanManagerInitialContextFactory implements InitialContextFactory {




    @Override
    public Context getInitialContext(Hashtable<?, ?> environment) throws NamingException {
        return new BeanManagerInitialContext();

    }
}
