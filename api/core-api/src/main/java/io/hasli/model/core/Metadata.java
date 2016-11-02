package io.hasli.model.core;

import io.hasli.model.core.entity.AbstractEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by haswell on 10/28/16.
 */

@Entity
@Inheritance(
    strategy = InheritanceType.TABLE_PER_CLASS
)
public abstract class Metadata extends AbstractEntity<UUID> {


    @Id
    private UUID id;


    protected Metadata(UUID t) {
        super(t);
        data = new HashMap<>();
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
