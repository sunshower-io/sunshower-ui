package io.hasli.model.core.deployment;

import io.hasli.model.core.crypto.Multihash;
import io.hasli.model.core.entity.AbstractEntity;
import org.eclipse.persistence.oxm.annotations.XmlDiscriminatorNode;

import javax.persistence.*;
import javax.xml.bind.annotation.*;

/**
 * Created by haswell on 11/9/16.
 */
@Entity
@XmlRootElement
@XmlAccessorType(XmlAccessType.NONE)
@Table(name = "APPLICATION_DESCRIPTOR")
public class ApplicationDescriptor extends AbstractEntity<Multihash> {

    @EmbeddedId
    @XmlElement
    @AttributeOverride(
            name = "hash",
            column =
            @Column(name = "id")
    )
    private Multihash id;

    @Embedded
    @XmlElement
    @AttributeOverride(
            name = "hash",
            column =
            @Column(name = "image")
    )
    private Multihash image;

    @Embedded
    @XmlElement
    @AttributeOverride(
            name = "hash",
            column =
            @Column(name = "haslifile")
    )
    private Multihash deploymentFile;

    @Embedded
    @XmlElement
    @AttributeOverride(
            name = "hash",
            column =
            @Column(name = "readme")
    )
    private Multihash readme;

    @Basic
    @XmlElement
    private String name;

    @Basic
    @XmlElement
    private String version;

    @Basic
    @XmlElement
    private String description;




    public ApplicationDescriptor() {

    }

    public ApplicationDescriptor(Multihash multihash) {
        super(multihash);
    }

    @Override
    public Multihash getId() {
        return id;
    }

    @Override
    public void setId(Multihash multihash) {
        this.id = multihash;
    }

    @Override
    protected void setDefaults() {

    }


    public Multihash getImage() {
        return image;
    }

    public void setImage(Multihash image) {
        this.image = image;
    }

    public Multihash getDeploymentFile() {
        return deploymentFile;
    }

    public void setDeploymentFile(Multihash deploymentFile) {
        this.deploymentFile = deploymentFile;
    }

    public Multihash getReadme() {
        return readme;
    }

    public void setReadme(Multihash readme) {
        this.readme = readme;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "ApplicationDescriptor{" +
                "id=" + id +
                ", image=" + image +
                ", deploymentFile=" + deploymentFile +
                ", readme=" + readme +
                ", name='" + name + '\'' +
                ", version='" + version + '\'' +
                ", description='" + description + '\'' +
                '}';
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
