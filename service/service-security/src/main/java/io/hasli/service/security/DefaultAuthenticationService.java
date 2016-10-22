package io.hasli.service.security;

import io.hasli.core.security.AuthenticationService;
import io.hasli.core.security.InvalidCredentialException;
import io.hasli.core.security.UserService;
import io.hasli.core.security.crypto.EncryptionService;
import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.Date;

/**
 * Created by haswell on 10/22/16.
 */
@Service
@Transactional
public class DefaultAuthenticationService implements AuthenticationService {

    @Inject
    private UserService userService;

    @Inject
    private EncryptionService encryptionService;


    @Override
    public Token authenticate(User user) {
        final String username = user.getUsername();
        final String password = user.getPassword();
        try {
            final User u = userService.findByUsername(username);
            if(encryptionService.matches(password, u.getPassword())) {
                final String token = encryptionService.createToken(u);
                return new Token(token, new Date());
            }
        } catch(UsernameNotFoundException ex) {
            ex.printStackTrace();
            //add logging
        }
        throw new InvalidCredentialException("Username or password combination is invalid");
    }


}
