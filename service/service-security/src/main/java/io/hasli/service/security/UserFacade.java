package io.hasli.service.security;

import io.hasli.model.core.auth.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * Created by haswell on 11/1/16.
 */
public class UserFacade implements UserDetails, Authentication{



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return unwrap(UserDetails.class).getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return unwrap(Authentication.class).getCredentials();
    }

    @Override
    public Object getDetails() {
        return unwrap(Authentication.class).getDetails();
    }

    @Override
    public Object getPrincipal() {
        return unwrap(Authentication.class).getPrincipal();
    }

    @Override
    public boolean isAuthenticated() {
        return unwrap(Authentication.class).isAuthenticated();
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        unwrap(Authentication.class).setAuthenticated(isAuthenticated);

    }

    @Override
    public String getPassword() {
        return unwrap(UserDetails.class).getPassword();
    }

    @Override
    public String getUsername() {
        return unwrap(UserDetails.class).getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return unwrap(UserDetails.class).isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return unwrap(UserDetails.class).isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return unwrap(UserDetails.class).isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return unwrap(UserDetails.class).isEnabled();
    }


    @SuppressWarnings("unchecked")
    public <T> T unwrap(Class<T> type) {
        if(Authentication.class.isAssignableFrom(type)) {
            return (T) SecurityContextHolder
                    .getContext().getAuthentication();
        }
        if(UserDetails.class.isAssignableFrom(type)) {
            return (T) unwrap(Authentication.class).getPrincipal();
        }
        return null;
    }

    @Override
    public String getName() {
        return null;
    }
}
