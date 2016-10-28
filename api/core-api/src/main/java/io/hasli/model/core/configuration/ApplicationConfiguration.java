package io.hasli.model.core.configuration;

import javax.persistence.Entity;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Set;

/**
 * Created by haswell on 10/26/16.
 */

//@Entity
@XmlRootElement(name = "configuration")
public class ApplicationConfiguration {

    @XmlElement
    private Set<ConfigurationRegion> regions;


}
