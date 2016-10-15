package io.hasli.model.core.auth;

import org.springframework.security.core.GrantedAuthority;

/**
 * Created by haswell on 10/15/16.
 */
public class Authority implements GrantedAuthority{

    final String authority;
    public Authority(final String authority) {
        this.authority = authority;
    }


    @Override
    public String getAuthority() {
        return authority;
    }
}
