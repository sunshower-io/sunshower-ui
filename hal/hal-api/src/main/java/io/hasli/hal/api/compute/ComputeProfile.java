package io.hasli.hal.api.compute;

import io.hasli.model.core.DistributableEntity;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
@Table(name = "COMPUTE_PROFILE")
public class ComputeProfile extends DistributableEntity {


    @Basic
    private int coreCount;


}
