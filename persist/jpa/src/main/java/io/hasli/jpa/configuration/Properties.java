package io.hasli.jpa.configuration;

import io.hasli.common.configuration.ValueHolder;

/**
 * Created by haswell on 10/16/16.
 */
public enum Properties implements ValueHolder {
    Dialect("jpa.dialect"),
    Generate("jpa.ddl.generate"),
    ShowSql("jpa.sql.show"),
    FormatSql("jpa.sql.format"),
    NamingStrategy("jpa.naming.strategy"),
    ;

    final String value;
    private Properties(String value) {
        this.value = value;
    }


    @Override
    public String value() {
        return value;
    }
}
