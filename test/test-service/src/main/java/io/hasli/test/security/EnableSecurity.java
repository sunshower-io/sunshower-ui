package io.hasli.test.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by haswell on 11/2/16.
 */
@Target(ElementType.TYPE)
@io.hasli.barometer.Aggregate(SecurityModule.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface EnableSecurity {
}
