package io.hasli.test.persist;

import io.hasli.barometer.Aggregate;

import java.lang.annotation.*;

/**
 * Created by haswell on 11/2/16.
 */
@Documented
@Inherited
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Aggregate(HibernateTestCase.class)
public @interface EnableJPA {
}
