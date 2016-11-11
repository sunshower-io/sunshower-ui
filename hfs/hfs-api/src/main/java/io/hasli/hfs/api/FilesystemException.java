package io.hasli.hfs.api;

/**
 * Created by haswell on 11/9/16.
 */
public class FilesystemException extends RuntimeException {


    public FilesystemException() {
        super();
    }

    public FilesystemException(String message) {
        super(message);
    }

    public FilesystemException(String message, Throwable cause) {
        super(message, cause);
    }

    public FilesystemException(Throwable cause) {
        super(cause);
    }

    protected FilesystemException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
