package io.hasli.service.security.jaxrs;

import io.hasli.model.core.auth.User;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.inject.Inject;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

/**
 * Created by haswell on 11/2/16.
 */
@Provider
public class AuthenticationContextProvider implements ContextResolver<User> {

    @Override
    public User getContext(Class<?> type) {
        return (User) SecurityContextHolder.getContext().getAuthentication();
    }
}
