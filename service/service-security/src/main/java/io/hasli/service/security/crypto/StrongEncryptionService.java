package io.hasli.service.security.crypto;

import io.hasli.core.security.InvalidCredentialException;
import io.hasli.core.security.InvalidTokenException;
import io.hasli.core.security.crypto.EncryptionService;
import io.hasli.model.core.auth.User;
import org.jasypt.util.text.TextEncryptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.UUID;


/**
 * Created by haswell on 10/22/16.
 */
@Service
public class StrongEncryptionService implements EncryptionService {

    @Inject
    private PasswordEncoder encoder;


    @Inject
    private TextEncryptor encrypter;


    @PersistenceContext
    private EntityManager entityManager;

    @Inject
    private MessageAuthenticationCode messageAuthenticationCode;


    @Override
    public String sign(String value) {
        return encrypter.encrypt(value);
    }

    @Override
    public String unsign(String value) {
        return encrypter.decrypt(value);
    }

    @Override
    public String encrypt(String password) {
        if(password == null) {
            throw new IllegalArgumentException("Expected password to encrypt to not be null");
        }
        return encoder.encode(password);
    }

    @Override
    public boolean matches(String raw, String password) {
        return encoder.matches(raw, password);
    }

    @Override
    public String createToken(User user) {
        final String password = encrypter.encrypt(user.getPassword());
        final String id = encrypter.encrypt(user.getId().toString());
        final String combined = id + "#" + password;
        return messageAuthenticationCode.token(combined);
    }


    @Override
    public User findByToken(String token) {
        final String total = messageAuthenticationCode.id(token);
        final String[] parts = total.split("#");

        if(parts.length != 2) {
            throw new InvalidTokenException("Nope");
        }
        final UUID id = UUID.fromString(encrypter.decrypt(parts[0]));
        final String password = encrypter.decrypt(parts[1]);

        final User user = entityManager.createQuery(
                "select u from User u " +
                "left join fetch u.roles as r " +
                "where u.id = :id", User.class)
                .setParameter("id", id).getSingleResult();
        if(password.equals(user.getPassword())) {
            return user;
        }
        throw new InvalidCredentialException("Frap");
    }

}
