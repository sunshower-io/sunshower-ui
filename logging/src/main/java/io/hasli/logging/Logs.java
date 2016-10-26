package io.hasli.logging;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;

/**
 * Created by haswell on 10/26/16.
 */
public class Logs {

    private static Logs logs;

    private final Configuration configuration;

    private Logs(Configuration cfg) {
        this.configuration = cfg;
        decorate(configuration);
    }

    private void decorate(Configuration cfg) {
        ThreadContext.put("ROOT", cfg.getRoot());
    }


    public static Logs getInstance(Configuration cfg) {
        if(logs == null) {
            synchronized(Logs.class) {
                if(logs == null) {
                    logs = new Logs(cfg);
                }
            }
        }
        return logs;
    }



    public Logger getLogger(Class<?> clazz) {
        final String name = resolveName(clazz);
        final Logger result = LogManager.getLogger(clazz);
        return new RoutingLogger(result, name);
    }

    private String resolveName(Class<?> clazz) {
        if(clazz.isAnnotationPresent(LogRegion.class)) {
            LogRegion region = clazz.getAnnotation(LogRegion.class);
            if(!"".equals(region.name())) {
                return region.name();
            }
            return region.value().name().toLowerCase();
        }
        return "application";
    }
}
