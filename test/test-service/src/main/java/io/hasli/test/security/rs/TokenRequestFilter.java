package io.hasli.test.security.rs;

import io.hasli.model.core.auth.Token;

import javax.ws.rs.client.ClientRequestContext;
import javax.ws.rs.client.ClientRequestFilter;
import java.io.IOException;

/**
 * Created by haswell on 11/2/16.
 */
public class TokenRequestFilter implements ClientRequestFilter {

    final Token token;

    public TokenRequestFilter(Token token) {
        this.token = token;
    }

    @Override
    public void filter(ClientRequestContext requestContext) throws IOException {
        requestContext.getHeaders().putSingle(
                "X-AUTH-TOKEN", token.getToken());
    }
}
