package io.hasli.common.configuration;

import io.hasli.core.api.Startable;
import io.hasli.core.api.Stoppable;

/**
 * Created by haswell on 10/16/16.
 *
 *
 * Abstraction over configuration sources (e.g file, Consul, Vault, etc.)
 */
public interface ConfigurationSource extends Startable, Stoppable {

    String get(ValueHolder v, boolean fail);

    String get(String key, boolean fail);

    String get(String key);

    String get(String key, String defaultValue);

    String set(String key, String value);

    String set(String key, String value, boolean override);

    boolean isSecure();

    <T> T unwrap(Class<T> type);

}