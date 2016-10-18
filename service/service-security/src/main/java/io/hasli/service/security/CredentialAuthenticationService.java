package io.hasli.service.security;

import io.hasli.core.security.CredentialService;
import io.hasli.model.core.auth.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by haswell on 10/11/16.
 */

@Service
@Transactional
public class CredentialAuthenticationService implements CredentialService {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = new User();
        u.setPassword("frap");
        u.setUsername(username);
        return u;
    }
}
