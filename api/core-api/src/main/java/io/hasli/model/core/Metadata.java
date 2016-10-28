package io.hasli.model.core;

import io.hasli.model.core.entity.AbstractEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Map;

/**
 * Created by haswell on 10/28/16.
 */
@MappedSuperclass
public abstract class Metadata<T extends Serializable> extends AbstractEntity<T> {


    protected Metadata(T t) {
        super(t);
    }


    @ElementCollection(
            targetClass = String.class
    )
    @JoinTable(
            name = "metadata_value",
            joinColumns =
                @JoinColumn(name = "id")
    )
    @Column(name = "value")
    @MapKeyColumn(name = "key")
    private Map<String, String> data;


    public void set(String key, String value) {
        this.data.put(key, value);
    }

    public String get(String key) {
        return this.data.get(key);
    }



}
