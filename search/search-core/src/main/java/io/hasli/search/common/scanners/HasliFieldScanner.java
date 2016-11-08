package io.hasli.search.common.scanners;

import io.hasli.search.api.Document;
import io.hasli.search.api.Field;
import io.hasli.search.api.Index;
import io.hasli.search.api.Scanner;
import io.hasli.search.common.TextDocument;
import io.hasli.search.common.TextField;

/**
 * Created by haswell on 11/8/16.
 */
public class HasliFieldScanner implements Scanner {



    @Override
    @SuppressWarnings("unchecked")
    public <T> Document scan(T object) {
        return scan((Class<T>) object.getClass(), object);
    }

    @Override
    public <T> Document scan(Class<T> clazz, T o) {
        final TextDocument textDocument = new TextDocument();
        parse(clazz, textDocument, o);
        return textDocument;
    }

    private <T> void parse(Class<T> type, TextDocument doc, T instance) {
        parseFields(type, doc, instance);
    }


    private <T> void parseFields(Class<T> type, TextDocument doc, T instance) {
        for(Class<?> c = type; c != null; c = c.getSuperclass()) {
            final java.lang.reflect.Field[] fields =
                    c.getDeclaredFields();

            for(java.lang.reflect.Field field : fields) {
                if(field.isAnnotationPresent(Index.class)) {
                    field.setAccessible(true);
                    try {
                        Object value = field.get(instance);
                        doc.addField(new TextField(
                                field.getType(),
                                field.getName(), value
                        ));
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
