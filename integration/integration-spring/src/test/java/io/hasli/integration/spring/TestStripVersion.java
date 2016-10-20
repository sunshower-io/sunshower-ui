package io.hasli.integration.spring;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Created by haswell on 10/14/16.
 */
public class TestStripVersion {

    String stripVersion(String input) {
        int fstIndexOf = input.indexOf('-');
        int lastIndexOf = input.lastIndexOf('.');


        if(fstIndexOf > -1 && lastIndexOf > -1) {
            final String extension = input.substring(lastIndexOf, input.length());
            final String fileName = input.substring(0, fstIndexOf);
            return fileName + extension;
        } else {
            return input;
        }
    }

    @Test
    public void ensureStripVersionWorks() {
        String name = "test-1.00.000.000.war";
        assertEquals("test.war", stripVersion(name));
    }
}
