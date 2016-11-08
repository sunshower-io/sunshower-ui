package io.hasli.search.common;

import io.hasli.search.api.Document;
import io.hasli.search.api.Field;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by haswell on 11/8/16.
 */
public class TextDocument implements Document {

    private final Set<Field> fields;

    public TextDocument() {
        fields = new HashSet<>();
    }

    public void addField(Field field) {
        this.fields.add(field);
    }

    @Override
    public Set<Field> getFields() {
        return this.fields;
    }
}
