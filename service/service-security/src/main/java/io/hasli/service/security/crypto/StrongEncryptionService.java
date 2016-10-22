package io.hasli.service.security.crypto;

import io.hasli.core.security.crypto.EncryptionService;
import io.hasli.model.core.auth.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

/**
 * Created by haswell on 10/22/16.
 */
@Service
public class StrongEncryptionService implements EncryptionService {

    @Inject
    private PasswordEncoder encoder;

    @Override
    public String encrypt(String password) {
        return encoder.encode(password);
    }

    @Override
    public boolean matches(String raw, String password) {
        return encoder.matches(raw, password);
    }

    @Override
    public String createToken(User user) {
        return null;
    }

}
