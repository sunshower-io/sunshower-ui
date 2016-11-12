package io.hasli.hal.api.providers;

import io.hasli.model.core.DistributableEntity;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/5/16.
 */

@Entity
@XmlRootElement
public class Provider extends DistributableEntity {

    @Basic
    private String name;

    @Basic
    private String icon;

    @Basic
    private String description;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
