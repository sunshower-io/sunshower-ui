package io.hasli.search.es.luc;

import io.hasli.search.api.FieldMapper;
import io.hasli.search.api.FieldMappings;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.TextField;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by haswell on 11/8/16.
 */
public class LuceneFieldMappings implements FieldMappings<Field> {
    static final Map<Class<?>, FieldMapper<Field>>
            mappings = new HashMap<>();

    static {
        register(String.class, new TextFieldMapper());
    }

    @Override
    public FieldMapper<Field> resolve(Class<?> type) {
        return mappings.get(type);
    }


    private static void register(
            Class<?> type,
            FieldMapper<Field> mapper) {
        mappings.put(type, mapper);
    }

    static class TextFieldMapper implements FieldMapper<Field> {


        @Override
        public Field map(io.hasli.search.api.Field field) {
            return new TextField(
                    field.getName(),
                    (String) field.getValue(),
                    Field.Store.YES
            );
        }
    }
}
