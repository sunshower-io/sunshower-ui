package io.hasli.service.security;

import io.hasli.core.security.AuthenticationService;
import io.hasli.core.security.UserService;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by haswell on 10/18/16.
 */
public class DefaultAuthenticationService implements AuthenticationService {

    @Inject
    private UserService userService;

    @Inject
    @Qualifier("authenticationManager")
    private AuthenticationManager authenticationManager;

    public User currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof UserDetails)) {
            throw new WebApplicationException(401);
        }
        UserDetails userDetails = (UserDetails) principal;
        return (User) userDetails;
//        return new User(userDetails.getUsername(), this.createRoleMap(userDetails));
    }

    public Token authenticate(User user) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                );
        Authentication authentication = authenticationManager
                .authenticate(authenticationToken);

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof User)) {
            throw new WebApplicationException(401);
        }

        return this.userService.createToken((User) principal);
    }

    private Map<String, Boolean> createRoleMap(UserDetails userDetails) {
        Map<String, Boolean> roles = new HashMap<String, Boolean>();
        for (GrantedAuthority authority : userDetails.getAuthorities()) {
            roles.put(authority.getAuthority(), Boolean.TRUE);
        }

        return roles;
    }
}
