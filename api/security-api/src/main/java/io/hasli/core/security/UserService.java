package io.hasli.core.security;

import io.hasli.model.core.auth.Token;
import io.hasli.model.core.auth.User;

import java.util.UUID;

public interface UserService {
    User get(UUID id);


    User findByUsername(String username);

}
