package io.hasli.spi;

import javax.inject.Qualifier;
import java.lang.annotation.*;

/**
 * Created by haswell on 10/13/16.
 */
@Documented
@Qualifier
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Integrator {

}
