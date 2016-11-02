package io.io.hasli.service.security.web;

import io.hasli.barometer.jaxrs.ClientDecorator;
import io.hasli.barometer.jaxrs.RestContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Created by haswell on 11/2/16.
 */
public class AuthenticationDecorator implements ClientDecorator {

    @Override
    public void decorate(RestContext restContext) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        System.out.println("AUTHENTICATION" + authentication);

    }
}
