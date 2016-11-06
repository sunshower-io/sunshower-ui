package io.hasli.hal.api.memory;

import io.hasli.model.core.DistributableEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/5/16.
 */
@Entity
@XmlRootElement
@Table(name = "MEMORY_PROFILE")
public class MemoryProfile extends DistributableEntity {
}
