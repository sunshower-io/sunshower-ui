package io.hasli.hal.api.units;

/**
 * Created by haswell on 11/6/16.
 */
public enum ByteUnit {

    Byte(1),
    Kilobyte(1000),
    Megabyte(1000 * Kilobyte.magnitude),
    Gigabyte(1000 * Megabyte.magnitude),
    Terrabyte(1000 * Gigabyte.magnitude),
    Exabyte(1000 * Gigabyte.magnitude)
    ;


    public long value(long value)  {
        return value * magnitude;
    }

    private final long magnitude;

    private ByteUnit(long magnitude) {
        this.magnitude = magnitude;
    }
}
