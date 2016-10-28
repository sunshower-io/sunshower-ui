package io.hasli.model.core;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by haswell on 10/26/16.
 */
@Entity
public class Version {

    @Id
    private Integer id;

    private Integer major;

    private Integer minor;

    private Integer minorMinor;

    private String extension;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMajor() {
        return major;
    }

    public void setMajor(Integer major) {
        this.major = major;
    }

    public Integer getMinor() {
        return minor;
    }

    public void setMinor(Integer minor) {
        this.minor = minor;
    }

    public Integer getMinorMinor() {
        return minorMinor;
    }

    public void setMinorMinor(Integer minorMinor) {
        this.minorMinor = minorMinor;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
