package io.hasli.test.security.rs;

import io.hasli.barometer.jaxrs.ProviderOverride;
import org.eclipse.persistence.jaxb.rs.MOXyJsonProvider;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;

/**
 * Created by haswell on 11/7/16.
 */
@Provider
@ProviderOverride
@Produces({MediaType.APPLICATION_JSON, MediaType.WILDCARD, "application/x-javascript"})
@Consumes({MediaType.APPLICATION_JSON, MediaType.WILDCARD})
public class MoxyOverrideProvider extends MOXyJsonProvider {

}
