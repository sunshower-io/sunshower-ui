package io.hasli.hal.api.storage;

import io.hasli.hal.api.units.ByteUnit;
import io.hasli.model.core.DistributableEntity;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/6/16.
 */
@Entity
@XmlRootElement
@Table(name = "STORAGE_PROFILE")
public class StorageProfile extends DistributableEntity {


    @Basic
    private Long capacity;

    @Enumerated(EnumType.ORDINAL)
    private ByteUnit unit;


    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public ByteUnit getUnit() {
        return unit;
    }

    public void setUnit(ByteUnit unit) {
        this.unit = unit;
    }
}
