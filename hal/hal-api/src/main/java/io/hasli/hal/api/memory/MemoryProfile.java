package io.hasli.hal.api.memory;

import io.hasli.hal.api.units.ByteUnit;
import io.hasli.model.core.DistributableEntity;
import io.hasli.search.api.Index;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/5/16.
 */
@Entity
@XmlRootElement
@Table(name = "MEMORY_PROFILE")
public class MemoryProfile extends DistributableEntity {

    @Basic
    @XmlAttribute
    private Long capacity;

    @Enumerated
    @XmlAttribute
    private ByteUnit unit;


    public MemoryProfile() {
        this.unit = ByteUnit.Megabyte;
    }

    @Index
    public long getBytes() {
        return this.unit.value(capacity);
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
