package io.hasli.hal.api.compute;

import io.hasli.model.core.DistributableEntity;
import io.hasli.search.api.Index;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Index
@Entity
@XmlRootElement
@Table(name = "COMPUTE_PROFILE")
public class ComputeProfile extends DistributableEntity {

    @Basic
    private int cores;


    public int getCores() {
        return cores;
    }

    public void setCores(int cores) {
        this.cores = cores;
    }
}
