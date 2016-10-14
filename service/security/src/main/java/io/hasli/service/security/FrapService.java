package io.hasli.service.security;

import javax.annotation.PostConstruct;
import javax.ejb.Startup;

/**
 * Created by haswell on 10/12/16.
 */
@Startup
public class FrapService {

    @PostConstruct
    public void startup() {
        System.out.println("FRAP");

    }

    public String frapADap() {
        return "crap";
    }
}
