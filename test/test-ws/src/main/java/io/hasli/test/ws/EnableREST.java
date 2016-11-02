package io.hasli.test.ws;

import io.hasli.barometer.Aggregate;

import java.lang.annotation.*;

/**
 * Created by haswell on 11/2/16.
 */
@Documented
@Inherited
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Aggregate(REST.class)
public @interface EnableREST {


}
