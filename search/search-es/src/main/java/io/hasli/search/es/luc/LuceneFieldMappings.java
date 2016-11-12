package io.hasli.search.es.luc;

import io.hasli.search.api.FieldMapper;
import io.hasli.search.api.FieldMappings;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.LongPoint;
import org.apache.lucene.document.TextField;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by haswell on 11/8/16.
 */
public class LuceneFieldMappings implements FieldMappings<Field> {
    static final Map<Class<?>, FieldMapper<Field>>
            mappings = new HashMap<>();

    static {
        register(String.class, new TextFieldMapper());
        final LongFieldMapper longFieldMapper = new LongFieldMapper();
        register(Long.class, longFieldMapper);
        register(long.class, longFieldMapper);
        register(UUID.class, new UUIDFieldMapper());
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

    static class LongFieldMapper implements FieldMapper<Field> {

        @Override
        public Field map(io.hasli.search.api.Field field) {
            return new LongPoint(field.getName(), (long) field.getValue());
        }
    }

    static class UUIDFieldMapper implements FieldMapper<Field> {
        @Override
        public Field map(io.hasli.search.api.Field field) {
            return new TextField(
                    field.getName(),
                    field.getValue().toString(),
                    Field.Store.YES
            );
        }

    }
}
