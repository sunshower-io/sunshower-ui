package io.hasli.search.common;

import io.hasli.search.api.Field;

/**
 * Created by haswell on 11/8/16.
 */
public class TextField implements Field {

    final String name;
    final Object value;
    final Class<?> type;

    public TextField(Class<?> type, String name, Object value) {
        this.type = type;
        this.name = name;
        this.value = value;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Class<?> getType() {
        return this.type;
    }

    @Override
    public Object getValue() {
        return this.value;
    }
}
