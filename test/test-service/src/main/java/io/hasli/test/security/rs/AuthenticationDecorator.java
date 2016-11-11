package io.hasli.test.security.rs;

import io.hasli.barometer.jaxrs.ClientDecorator;
import io.hasli.barometer.jaxrs.RestContext;
import io.hasli.common.rs.ClassParameterProviderFactory;
import io.hasli.core.security.AuthenticationService;
import io.hasli.model.core.auth.Role;
import io.hasli.model.core.auth.User;
import io.hasli.service.signup.SignupService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.TestSecurityContextHolder;

import java.util.stream.Collectors;

/**
 * Created by haswell on 11/2/16.
 */
public class AuthenticationDecorator implements ClientDecorator {

    static int count = 0;

    @Override
    public void decorate(RestContext restContext) {
        restContext.getClient().register(new ClassParameterProviderFactory());
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken)
                        TestSecurityContextHolder.getContext().getAuthentication();

        if(authentication != null) {
            org.springframework.security.core.userdetails.User principal =
                    (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

            User u = new User();
            u.setUsername(principal.getUsername());
            u.setPassword(principal.getPassword());
            u.setEmailAddress(principal.getUsername() + "@" + count++ + "gmail");
            String password = u.getPassword();
            u.setRoles(principal.getAuthorities()
                    .stream().map(t ->
                            new Role(t.getAuthority())
                    ).collect(Collectors.toSet()));
            SignupService signupService = restContext.getContext().getBean(SignupService.class);
            signupService.signup(u);
            AuthenticationService service = restContext
                    .getContext().getBean(AuthenticationService.class);
            u.setPassword(password);
            io.hasli.model.core.auth.Authentication t = service.authenticate(u);
            restContext.getClient().register(new TokenRequestFilter(t.getToken()));
        }
    }
}
