package io.hasli.search.common.scanners;

import io.hasli.search.api.Document;
import io.hasli.search.api.Index;
import io.hasli.search.api.Scanner;
import io.hasli.search.common.TextDocument;
import io.hasli.search.common.TextField;

import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Set;

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
        parse(clazz, textDocument, o, new HashSet<>());
        return textDocument;
    }

    private void parse(Class<?> type, TextDocument doc, Object instance, Set<Object> visited) {
        parseFields(type, doc, instance, visited);
        parseGetters(type, doc, instance, visited);
    }


    private void parseGetters(Class<?> type, TextDocument doc, Object instance, Set<Object> visited) {


        for (Class<?> c = type; c != null; c = c.getSuperclass()) {
            final java.lang.reflect.Method[] methods =
                    c.getDeclaredMethods();

            final boolean scanType = c.isAnnotationPresent(Index.class);

            for (Method method : methods) {
                if ((scanType ||
                        method.isAnnotationPresent(Index.class)
                ) && method.getName().startsWith("get")) {
                    method.setAccessible(true);
                    try {
                        Object value = method.invoke(instance);
                        if(value != null) {
                            if (isPrimitive(value)) {
                                doc.addField(new TextField(
                                        method.getReturnType(),
                                        name(c, method),
                                        value
                                ));
                            } else {
                                if (!visited.contains(value)) {
                                    parse(value.getClass(), doc, value, visited);
                                }
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    private void parseFields(Class<?> type, TextDocument doc, Object instance, Set<Object> visited) {

        for (Class<?> c = type; c != null; c = c.getSuperclass()) {
            final java.lang.reflect.Field[] fields =
                    c.getDeclaredFields();

            final boolean scanType = c.isAnnotationPresent(Index.class);

            for (java.lang.reflect.Field field : fields) {
                if (scanType || field.isAnnotationPresent(Index.class)) {
                    field.setAccessible(true);
                    try {
                        Object value = field.get(instance);
                        if(value != null) {
                            if (isPrimitive(value)) {
                                doc.addField(new TextField(
                                        field.getType(),
                                        name(c, field),
                                        value
                                ));
                            } else {
                                if (!visited.contains(value)) {
                                    parse(value.getClass(), doc, value, visited);
                                }
                            }
                        }
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    private String name(Class<?> host, java.lang.reflect.Member field) {
        String name = host.getSimpleName() + "#" + field.getName();
        return name;
    }


    boolean isPrimitive(Object value) {
        final Class<?> type = value.getClass();
        return type == int.class
                || type == Integer.class
                || type == String.class
                || type == Long.class
                || type == Boolean.class
                || type == boolean.class
                || type == float.class
                || type == Float.class;
    }
}
