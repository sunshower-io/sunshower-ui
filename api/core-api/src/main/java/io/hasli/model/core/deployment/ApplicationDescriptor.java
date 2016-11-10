package io.hasli.model.core.deployment;

import io.hasli.model.core.crypto.Multihash;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/9/16.
 */
@Entity
@XmlRootElement
@Table(name = "APPLICATION_DESCRIPTOR")
public class ApplicationDescriptor  {

    @EmbeddedId
    private Multihash id;


    @Column(name = "image")
    private Multihash image;

    @Column(name = "haslifile")
    private Multihash deploymentFile;


    @Column(name = "readme")
    private Multihash readme;

//    @OneToOne(
//            cascade = CascadeType.ALL,
//            orphanRemoval = true
//    )
//    @JoinColumn(
//            name = "application_details_id"
//    )
    @Transient
    private ApplicationDetails details;


//    public ApplicationDescriptor() {
//        super(null);
//    }
//
    public ApplicationDescriptor(Multihash multihash) {
        setId(multihash);
    }

//    @Override
    public Multihash getId() {
        return id;
    }

//    @Override
    protected void setId(Multihash multihash) {
        this.id = multihash;
    }

//    @Override
    protected void setDefaults() {

    }

    @Override
    public String toString() {
        return null;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApplicationDescriptor)) return false;

        ApplicationDescriptor that = (ApplicationDescriptor) o;

        return id != null ? id.equals(that.id) : that.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
