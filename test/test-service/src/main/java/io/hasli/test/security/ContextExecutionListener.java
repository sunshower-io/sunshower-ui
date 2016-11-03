package io.hasli.test.security;

import org.springframework.core.Ordered;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;

/**
 * Created by haswell on 11/2/16.
 */
public class ContextExecutionListener extends WithSecurityContextTestExecutionListener {

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
