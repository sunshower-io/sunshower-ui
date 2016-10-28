package io.hasli.logging;

import java.io.File;

/**
 * Created by haswell on 10/26/16.
 */
public class Configuration {

    private String root;

    public String getRoot() {
        return root;
    }


    public Configuration setRoot(String file) {
        this.root = file;
        return this;
    }



    public static Configuration newConfiguration() {
        return new Configuration();
    }
}
