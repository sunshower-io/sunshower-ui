package io.hasli.core.security;

import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;

import java.util.UUID;

public interface UserService {
    User get(UUID id);

    Token createToken(User user);

    User findByUsername(String username);

    User findByToken(String accessToken);
}
