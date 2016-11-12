package io.hasli.hal.api;

import io.hasli.model.core.DistributableEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.lang.annotation.Target;

/**
 * Created by haswell on 11/6/16.
 */
@Entity
@Table(name = "operating_system")
public class OperatingSystem extends DistributableEntity {

}
