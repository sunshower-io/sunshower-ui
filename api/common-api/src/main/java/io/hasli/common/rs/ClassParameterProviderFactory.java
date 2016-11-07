package io.hasli.common.rs;

import javax.ws.rs.ext.ParamConverter;
import javax.ws.rs.ext.ParamConverterProvider;
import javax.ws.rs.ext.Provider;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.util.UUID;

/**
 * Created by haswell on 11/3/16.
 */
@Provider
@SuppressWarnings("unchecked")
public class ClassParameterProviderFactory
        implements ParamConverterProvider {


    @Override
    public <T> ParamConverter<T> getConverter(
            Class<T> rawType,
            Type genericType,
            Annotation[] annotations
    ) {
        if(rawType == Class.class) {
            return (ParamConverter<T>) new ClassParameterConverter();
        } else if(rawType == UUID.class) {
            return (ParamConverter<T>) new UUIDParameterConverter();
        }
        return null;
    }

    private static class UUIDParameterConverter implements ParamConverter<UUID> {

        @Override
        public UUID fromString(String value) {
            return UUID.fromString(value);
        }

        @Override
        public String toString(UUID value) {
            return value.toString();
        }
    }

    private static class ClassParameterConverter implements ParamConverter<Class<?>> {

        @Override
        public Class<?> fromString(String value) {
            try {
                return Class.forName(value);
            } catch (ClassNotFoundException e) {
                return null;
            }
        }

        @Override
        public String toString(Class<?> value) {
            return value.getName();
        }
    }
}
