package io.hasli.model.core.deployment;

import io.hasli.model.core.Metadata;
import io.hasli.model.core.crypto.Multihash;
import io.hasli.model.core.entity.AbstractEntity;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.UUID;

/**
 * Created by haswell on 11/9/16.
 */
@Entity
@XmlRootElement
@Table(name = "APPLICATION_DETAILS")
public class ApplicationDetails extends AbstractEntity<Multihash> {

    @EmbeddedId
    @XmlAttribute
    private Multihash id;

    @Column
    private String name;

    @Column
    private String version;


    public ApplicationDetails() {
        super(null);
    }

    public ApplicationDetails(Multihash id) {
        super(id);
    }


    @Override
    public Multihash getId() {
        return id;
    }

    @Override
    protected void setId(Multihash multihash) {
        this.id = multihash;
    }

    @Override
    protected void setDefaults() {

    }

    @Override
    public boolean equals(Object obj) {
        return false;
    }

    @Override
    public String toString() {
        return null;
    }
}
