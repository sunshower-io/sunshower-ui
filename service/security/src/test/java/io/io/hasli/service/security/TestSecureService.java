package io.io.hasli.service.security;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import javax.annotation.security.RolesAllowed;

/**
 * Created by haswell on 10/15/16.
 */

@Service
public class TestSecureService {

    @PreAuthorize("hasRole('admin')")
    public String sayHelloAdmin() {
        return "hello";
    }

    @PreAuthorize("hasRole('user')")
    public String sayHelloUser() {
        return "World";
    }

    @RolesAllowed("admin")
    public String sayHelloRolesAllowed() {
        return "Frap";
    }
}
