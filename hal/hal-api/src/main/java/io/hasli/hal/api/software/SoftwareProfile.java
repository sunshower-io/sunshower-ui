package io.hasli.hal.api.software;

import io.hasli.model.core.DistributableEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 11/6/16.
 */
@Entity
@XmlRootElement
@Table(name = "software_profile")
public class SoftwareProfile extends DistributableEntity {

}
