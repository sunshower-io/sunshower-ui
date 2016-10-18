package io.hasli.service.security;

import io.hasli.model.core.auth.User;
import io.hasli.service.signup.SignupService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by haswell on 10/17/16.
 */
@Service
@Transactional
public class DefaultSignupService implements SignupService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User signup(User input) {
        return entityManager.merge(input);
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<User> list() {
        return entityManager.createQuery("select u from User u").getResultList();
    }


}
