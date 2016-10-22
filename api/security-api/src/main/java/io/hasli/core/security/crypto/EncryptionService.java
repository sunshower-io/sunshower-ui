package io.hasli.core.security.crypto;

import io.hasli.model.core.auth.User;

/**
 * Created by haswell on 10/22/16.
 */
public interface EncryptionService {

    String sign(String value);

    String unsign(String value);

    String encrypt(String password);

    boolean matches(String raw, String password);

    String createToken(User user);

    User findByToken(String token);
}
