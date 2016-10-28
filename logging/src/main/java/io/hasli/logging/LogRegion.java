package io.hasli.logging;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Created by haswell on 10/26/16.
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface LogRegion {

    String name() default "";

    Regions value() default Regions.Application;
}
