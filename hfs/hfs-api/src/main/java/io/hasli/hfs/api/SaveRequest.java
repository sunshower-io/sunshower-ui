package io.hasli.hfs.api;

import org.jboss.resteasy.annotations.providers.multipart.PartType;

import javax.ws.rs.FormParam;
import javax.ws.rs.core.MediaType;
import java.io.InputStream;

/**
 * Created by haswell on 11/8/16.
 */

public class SaveRequest {

    @FormParam("file")
    @PartType(MediaType.APPLICATION_OCTET_STREAM)
    private InputStream inputStream;


    public SaveRequest(final InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public SaveRequest() {

    }

    public InputStream getInputStream() {
        return inputStream;
    }
}
