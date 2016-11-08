package io.hasli.hal.api.storage;

import io.hasli.hal.api.units.ByteUnit;
import io.hasli.model.core.DistributableEntity;
import io.hasli.search.api.Index;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
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


    @Index
    public long getBytes() {
        return unit.value(capacity);
    }

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
