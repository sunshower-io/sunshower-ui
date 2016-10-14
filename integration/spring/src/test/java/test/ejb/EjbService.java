package test.ejb;

import io.hasli.integration.spring.EjbSpringIntegrationPoint;
import javax.ejb.Stateless;
import javax.interceptor.Interceptors;

/**
 * Created by haswell on 10/14/16.
 */

@Stateless(name = "service/testservice")
@Interceptors(EjbSpringIntegrationPoint.class)
public class EjbService {


}
