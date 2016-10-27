package io.hasli.model.core;

import io.hasli.model.core.auth.User;

import javax.persistence.*;
import javax.xml.bind.annotation.*;
import java.util.*;

/**
 * Created by haswell on 10/26/16.
 */
@Entity
@XmlRootElement(name = "application")
@XmlAccessorType(XmlAccessType.NONE)
public class Application {

    @Id
    private UUID id;

    @XmlAttribute
    private Boolean enabled;

    @XmlElement
    @Column(name = "instance_id")
    private String  instanceId;

    @XmlElement
    private String location;


    @XmlElement
    @Column(name = "`name`")
    private String name;

    @XmlAttribute
    @Column(name = "started_on")
    private Date instanceStarted;

    @XmlElement
    @Column(name = "last_shutdown")
    private Date lastShutdown;


    @XmlElement
    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Version version;


    @XmlElement
    @Transient
    private List<User> administrators =
            new ArrayList<>();


    public Application() {
        this.id = UUID.randomUUID();
    }


    public void addAdministrator(User u) {
        this.administrators.add(u);
    }



    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getInstanceId() {
        return instanceId;
    }

    public void setInstanceId(String instanceId) {
        this.instanceId = instanceId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getInstanceStarted() {
        return instanceStarted;
    }

    public void setInstanceStarted(Date instanceStarted) {
        this.instanceStarted = instanceStarted;
    }

    public Date getLastShutdown() {
        return lastShutdown;
    }

    public void setLastShutdown(Date lastShutdown) {
        this.lastShutdown = lastShutdown;
    }

    public Version getVersion() {
        return version;
    }

    public void setVersion(Version version) {
        this.version = version;
    }

    public List<User> getAdministrators() {
        return administrators;
    }

    public void setAdministrators(List<User> administrators) {
        this.administrators = administrators;
    }
}
