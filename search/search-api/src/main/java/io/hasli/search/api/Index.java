package io.hasli.search.api;

import java.lang.annotation.*;

/**
 * Created by haswell on 11/8/16.
 */

@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({
        ElementType.TYPE,
        ElementType.FIELD,
        ElementType.METHOD
})
public @interface Index {


}
