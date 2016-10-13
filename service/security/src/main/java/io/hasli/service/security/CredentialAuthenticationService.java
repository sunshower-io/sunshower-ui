package io.hasli.service.security;

import javax.inject.Inject;
/**
 * Created by haswell on 10/11/16.
 */
public class CredentialAuthenticationService {

    @Inject
    private FrapService dapService;

    public String sayHello(String name) {
        return "Cool" + name + dapService.frapADap();

    }
}
