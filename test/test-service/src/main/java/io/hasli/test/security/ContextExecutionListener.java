package io.hasli.test.security;

import org.springframework.core.Ordered;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.test.context.TestSecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.TestContext;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by haswell on 11/2/16.
 */
public class ContextExecutionListener extends WithSecurityContextTestExecutionListener {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public void afterTestMethod(TestContext testContext) throws Exception {
        final Authentication auth = TestSecurityContextHolder
                .getContext().getAuthentication();

        if(auth != null) {
            entityManager.createQuery("delete from User as u where u.username = :name")
                    .setParameter("name", ((User) auth.getCredentials()).getUsername())
                    .executeUpdate();
        }
        super.afterTestMethod(testContext);
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
