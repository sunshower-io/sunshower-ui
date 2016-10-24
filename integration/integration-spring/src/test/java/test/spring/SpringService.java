package test.spring;

import org.springframework.stereotype.Service;
import test.ejb.EjbService;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.enterprise.inject.Vetoed;

/**
 * Created by haswell on 10/14/16.
 */
@Service
@Vetoed
public class SpringService {

    @Resource(mappedName = "java:module/service/testservice")
    private EjbService service;
}
