package io.hasli.test.security;

import io.hasli.barometer.Listeners;
import io.hasli.barometer.Module;
/**
 * Created by haswell on 11/2/16.
 */
@Module
@Listeners(
        ContextExecutionListener.class
)
public class SecurityModule {

}
