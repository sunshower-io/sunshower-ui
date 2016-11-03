package io.hasli.common.rs;

import javax.ws.rs.ext.ParamConverter;
import javax.ws.rs.ext.ParamConverterProvider;
import javax.ws.rs.ext.Provider;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;

/**
 * Created by haswell on 11/3/16.
 */
@Provider
@SuppressWarnings("unchecked")
public class ClassParameterProviderFactory implements ParamConverterProvider {


    @Override
    public <T> ParamConverter<T> getConverter(
            Class<T> rawType,
            Type genericType,
            Annotation[] annotations
    ) {
        if(rawType == Class.class) {
            return (ParamConverter<T>) new ClassParameterConverter();
        }
        return null;
    }

    static class ClassParameterConverter implements ParamConverter<Class<?>> {

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
