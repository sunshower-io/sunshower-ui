package io.hasli.search.common;

import io.hasli.search.api.Document;
import io.hasli.search.api.Field;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Created by haswell on 11/8/16.
 */
public class TextDocument implements Document {

    private final UUID id;
    private final Set<Field> fields;

    public TextDocument() {
        this(null);
    }

    public TextDocument(UUID id) {
        this.id = id;
        fields = new HashSet<>();
    }

    public void addField(Field field) {
        this.fields.add(field);
    }

    @Override
    public Serializable getId() {
        return id;
    }

    @Override
    public Set<Field> getFields() {
        return this.fields;
    }
}
