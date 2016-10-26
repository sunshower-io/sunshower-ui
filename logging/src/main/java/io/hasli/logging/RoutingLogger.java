package io.hasli.logging;


import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.ThreadContext;
import org.apache.logging.log4j.message.EntryMessage;
import org.apache.logging.log4j.message.Message;
import org.apache.logging.log4j.message.MessageFactory;
import org.apache.logging.log4j.util.MessageSupplier;
import org.apache.logging.log4j.util.Supplier;

/**
 * Created by haswell on 10/26/16.
 */
class RoutingLogger implements Logger {

    private final String region;
    private final Logger delegate;

    RoutingLogger(Logger delegate, String region) {
        this.region = region;
        this.delegate = delegate;
    }


    private void push() {
        ThreadContext.put("REGION", region);

    }

    private void pop() {
        ThreadContext.remove("REGION");
    }

    @Override
    public void catching(Level level, Throwable t) {
        push();
        delegate.catching(level, t);
        pop();
    }

    @Override
    public void catching(Throwable t) {
        push();
        delegate.catching(t);
        pop();
    }

    @Override
    public void debug(Marker marker, Message msg) {
        push();
        delegate.debug(marker, msg);
        pop();
    }

    @Override
    public void debug(Marker marker, Message msg, Throwable t) {
        push();
        delegate.debug(marker, msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void debug(Marker marker, MessageSupplier msgSupplier) {
        push();
        delegate.debug(marker, msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void debug(Marker marker, MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.debug(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void debug(Marker marker, CharSequence message) {
        push();
        delegate.debug(marker, message);
        pop();
    }

    @Override
    public void debug(Marker marker, CharSequence message, Throwable t) {
        push();
        delegate.debug(marker, message, t);
        pop();
    }

    @Override
    public void debug(Marker marker, Object message) {
        push();
        delegate.debug(marker, message);
        pop();
    }

    @Override
    public void debug(Marker marker, Object message, Throwable t) {
        push();
        delegate.debug(marker, message, t);
        pop();
    }

    @Override
    public void debug(Marker marker, String message) {
        push();
        delegate.debug(marker, message);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object... params) {
        push();
        delegate.debug(marker, message, params);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.debug(marker, message, paramSuppliers);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Throwable t) {
        push();
        delegate.debug(marker, message, t);
        pop();
    }

    @Override
    public void debug(Marker marker, Supplier<?> msgSupplier) {
        push();
        delegate.debug(marker, msgSupplier);
        pop();
    }

    @Override
    public void debug(Marker marker, Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.debug(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void debug(Message msg) {
        push();
        delegate.debug(msg);
        pop();
    }

    @Override
    public void debug(Message msg, Throwable t) {
        push();
        delegate.debug(msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void debug(MessageSupplier msgSupplier) {
        push();
        delegate.debug(msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void debug(MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.debug(msgSupplier, t);
        pop();
    }

    @Override
    public void debug(CharSequence message) {
        push();
        delegate.debug(message);
        pop();
    }

    @Override
    public void debug(CharSequence message, Throwable t) {
        push();
        delegate.debug(message, t);
        pop();
    }

    @Override
    public void debug(Object message) {
        push();
        delegate.debug(message);
        pop();
    }

    @Override
    public void debug(Object message, Throwable t) {
        push();
        delegate.debug(message, t);
        pop();
    }

    @Override
    public void debug(String message) {
        push();
        delegate.debug(message);
        pop();
    }

    @Override
    public void debug(String message, Object... params) {
        push();
        delegate.debug(message, params);
        pop();
    }

    @Override
    public void debug(String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.debug(message, paramSuppliers);
        pop();
    }

    @Override
    public void debug(String message, Throwable t) {
        push();
        delegate.debug(message, t);
        pop();
    }

    @Override
    public void debug(Supplier<?> msgSupplier) {
        push();
        delegate.debug(msgSupplier);
        pop();
    }

    @Override
    public void debug(Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.debug(msgSupplier, t);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0) {
        push();
        delegate.debug(marker, message, p0);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0, Object p1) {
        push();
        delegate.debug(marker, message, p0, p1);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0, Object p1, Object p2) {
        push();
        delegate.debug(marker, message, p0, p1, p2);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.debug(marker, message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.debug(marker, message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.debug(marker, message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.debug(marker, message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.debug(marker, message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.debug(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void debug(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.debug(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public void debug(String message, Object p0) {
        push();
        delegate.debug(message, p0);
        pop();
    }

    @Override
    public void debug(String message, Object p0, Object p1) {
        push();
        delegate.debug(message, p0, p1);
        pop();
    }

    @Override
    public void debug(String message, Object p0, Object p1, Object p2) {
        push();
        delegate.debug(message, p0, p1, p2);
        pop();
    }

    @Override
    public void debug(String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.debug(message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void debug(String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.debug(message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void debug(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.debug(message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void debug(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.debug(message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void debug(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.debug(message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void debug(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.debug(message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void debug(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.debug(message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    @Deprecated
    public void entry() {
        delegate.entry();
    }

    @Override
    public void entry(Object... params) {
        push();
        delegate.entry(params);
        pop();
    }

    @Override
    public void error(Marker marker, Message msg) {
        push();
        delegate.error(marker, msg);
        pop();
    }

    @Override
    public void error(Marker marker, Message msg, Throwable t) {
        push();
        delegate.error(marker, msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void error(Marker marker, MessageSupplier msgSupplier) {
        push();
        delegate.error(marker, msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void error(Marker marker, MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.error(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void error(Marker marker, CharSequence message) {
        push();
        delegate.error(marker, message);
        pop();
    }

    @Override
    public void error(Marker marker, CharSequence message, Throwable t) {
        push();
        delegate.error(marker, message, t);
        pop();
    }

    @Override
    public void error(Marker marker, Object message) {
        push();
        delegate.error(marker, message);
        pop();
    }

    @Override
    public void error(Marker marker, Object message, Throwable t) {
        push();
        delegate.error(marker, message, t);
        pop();
    }

    @Override
    public void error(Marker marker, String message) {
        push();
        delegate.error(marker, message);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object... params) {
        push();
        delegate.error(marker, message, params);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.error(marker, message, paramSuppliers);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Throwable t) {
        push();
        delegate.error(marker, message, t);
        pop();
    }

    @Override
    public void error(Marker marker, Supplier<?> msgSupplier) {
        push();
        delegate.error(marker, msgSupplier);
        pop();
    }

    @Override
    public void error(Marker marker, Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.error(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void error(Message msg) {
        push();
        delegate.error(msg);
        pop();
    }

    @Override
    public void error(Message msg, Throwable t) {
        push();
        delegate.error(msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void error(MessageSupplier msgSupplier) {
        push();
        delegate.error(msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void error(MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.error(msgSupplier, t);
        pop();
    }

    @Override
    public void error(CharSequence message) {
        push();
        delegate.error(message);
        pop();
    }

    @Override
    public void error(CharSequence message, Throwable t) {
        push();
        delegate.error(message, t);
        pop();
    }

    @Override
    public void error(Object message) {
        push();
        delegate.error(message);
        pop();
    }

    @Override
    public void error(Object message, Throwable t) {
        push();
        delegate.error(message, t);
        pop();
    }

    @Override
    public void error(String message) {
        push();
        delegate.error(message);
        pop();
    }

    @Override
    public void error(String message, Object... params) {
        push();
        delegate.error(message, params);
        pop();
    }

    @Override
    public void error(String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.error(message, paramSuppliers);
        pop();
    }

    @Override
    public void error(String message, Throwable t) {
        push();
        delegate.error(message, t);
        pop();
    }

    @Override
    public void error(Supplier<?> msgSupplier) {
        push();
        delegate.error(msgSupplier);
        pop();
    }

    @Override
    public void error(Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.error(msgSupplier, t);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0) {
        push();
        delegate.error(marker, message, p0);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0, Object p1) {
        push();
        delegate.error(marker, message, p0, p1);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0, Object p1, Object p2) {
        push();
        delegate.error(marker, message, p0, p1, p2);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.error(marker, message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.error(marker, message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.error(marker, message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.error(marker, message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.error(marker, message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.error(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void error(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.error(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public void error(String message, Object p0) {
        push();
        delegate.error(message, p0);
        pop();
    }

    @Override
    public void error(String message, Object p0, Object p1) {
        push();
        delegate.error(message, p0, p1);
        pop();
    }

    @Override
    public void error(String message, Object p0, Object p1, Object p2) {
        push();
        delegate.error(message, p0, p1, p2);
        pop();
    }

    @Override
    public void error(String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.error(message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void error(String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.error(message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void error(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.error(message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void error(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.error(message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void error(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.error(message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void error(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.error(message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void error(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.error(message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    @Deprecated
    public void exit() {
        delegate.exit();
    }

    @Override
    @Deprecated
    public <R> R exit(R result) {
        return delegate.exit(result);
    }

    @Override
    public void fatal(Marker marker, Message msg) {
        push();
        delegate.fatal(marker, msg);
        pop();
    }

    @Override
    public void fatal(Marker marker, Message msg, Throwable t) {
        push();
        delegate.fatal(marker, msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void fatal(Marker marker, MessageSupplier msgSupplier) {
        push();
        delegate.fatal(marker, msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void fatal(Marker marker, MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.fatal(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void fatal(Marker marker, CharSequence message) {
        push();
        delegate.fatal(marker, message);
        pop();
    }

    @Override
    public void fatal(Marker marker, CharSequence message, Throwable t) {
        push();
        delegate.fatal(marker, message, t);
        pop();
    }

    @Override
    public void fatal(Marker marker, Object message) {
        push();
        delegate.fatal(marker, message);
        pop();
    }

    @Override
    public void fatal(Marker marker, Object message, Throwable t) {
        push();
        delegate.fatal(marker, message, t);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message) {
        push();
        delegate.fatal(marker, message);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object... params) {
        push();
        delegate.fatal(marker, message, params);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.fatal(marker, message, paramSuppliers);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Throwable t) {
        push();
        delegate.fatal(marker, message, t);
        pop();
    }

    @Override
    public void fatal(Marker marker, Supplier<?> msgSupplier) {
        push();
        delegate.fatal(marker, msgSupplier);
        pop();
    }

    @Override
    public void fatal(Marker marker, Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.fatal(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void fatal(Message msg) {
        push();
        delegate.fatal(msg);
        pop();
    }

    @Override
    public void fatal(Message msg, Throwable t) {
        push();
        delegate.fatal(msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void fatal(MessageSupplier msgSupplier) {
        push();
        delegate.fatal(msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void fatal(MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.fatal(msgSupplier, t);
        pop();
    }

    @Override
    public void fatal(CharSequence message) {
        push();
        delegate.fatal(message);
        pop();
    }

    @Override
    public void fatal(CharSequence message, Throwable t) {
        push();
        delegate.fatal(message, t);
        pop();
    }

    @Override
    public void fatal(Object message) {
        push();
        delegate.fatal(message);
        pop();
    }

    @Override
    public void fatal(Object message, Throwable t) {
        push();
        delegate.fatal(message, t);
        pop();
    }

    @Override
    public void fatal(String message) {
        push();
        delegate.fatal(message);
        pop();
    }

    @Override
    public void fatal(String message, Object... params) {
        push();
        delegate.fatal(message, params);
        pop();
    }

    @Override
    public void fatal(String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.fatal(message, paramSuppliers);
        pop();
    }

    @Override
    public void fatal(String message, Throwable t) {
        push();
        delegate.fatal(message, t);
        pop();
    }

    @Override
    public void fatal(Supplier<?> msgSupplier) {
        push();
        delegate.fatal(msgSupplier);
        pop();
    }

    @Override
    public void fatal(Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.fatal(msgSupplier, t);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0) {
        push();
        delegate.fatal(marker, message, p0);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0, Object p1) {
        push();
        delegate.fatal(marker, message, p0, p1);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0, Object p1, Object p2) {
        push();
        delegate.fatal(marker, message, p0, p1, p2);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.fatal(marker, message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.fatal(marker, message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.fatal(marker, message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.fatal(marker, message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.fatal(marker, message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.fatal(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void fatal(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.fatal(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public void fatal(String message, Object p0) {
        push();
        delegate.fatal(message, p0);
        pop();
    }

    @Override
    public void fatal(String message, Object p0, Object p1) {
        push();
        delegate.fatal(message, p0, p1);
        pop();
    }

    @Override
    public void fatal(String message, Object p0, Object p1, Object p2) {
        push();
        delegate.fatal(message, p0, p1, p2);
        pop();
    }

    @Override
    public void fatal(String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.fatal(message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void fatal(String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.fatal(message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void fatal(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.fatal(message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void fatal(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.fatal(message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void fatal(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.fatal(message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void fatal(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.fatal(message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void fatal(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.fatal(message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public Level getLevel() {
        return delegate.getLevel();
    }

    @Override
    public <MF extends MessageFactory> MF getMessageFactory() {
        return delegate.getMessageFactory();
    }

    @Override
    public String getName() {
        return delegate.getName();
    }

    @Override
    public void info(Marker marker, Message msg) {
        push();
        delegate.info(marker, msg);
        pop();
    }

    @Override
    public void info(Marker marker, Message msg, Throwable t) {
        push();
        delegate.info(marker, msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void info(Marker marker, MessageSupplier msgSupplier) {
        push();
        delegate.info(marker, msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void info(Marker marker, MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.info(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void info(Marker marker, CharSequence message) {
        push();
        delegate.info(marker, message);
        pop();
    }

    @Override
    public void info(Marker marker, CharSequence message, Throwable t) {
        push();
        delegate.info(marker, message, t);
        pop();
    }

    @Override
    public void info(Marker marker, Object message) {
        push();
        delegate.info(marker, message);
        pop();
    }

    @Override
    public void info(Marker marker, Object message, Throwable t) {
        push();
        delegate.info(marker, message, t);
        pop();
    }

    @Override
    public void info(Marker marker, String message) {
        push();
        delegate.info(marker, message);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object... params) {
        push();
        delegate.info(marker, message, params);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.info(marker, message, paramSuppliers);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Throwable t) {
        push();
        delegate.info(marker, message, t);
        pop();
    }

    @Override
    public void info(Marker marker, Supplier<?> msgSupplier) {
        push();
        delegate.info(marker, msgSupplier);
        pop();
    }

    @Override
    public void info(Marker marker, Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.info(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void info(Message msg) {
        push();
        delegate.info(msg);
        pop();
    }

    @Override
    public void info(Message msg, Throwable t) {
        push();
        delegate.info(msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void info(MessageSupplier msgSupplier) {
        push();
        delegate.info(msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void info(MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.info(msgSupplier, t);
        pop();
    }

    @Override
    public void info(CharSequence message) {
        push();
        delegate.info(message);
        pop();
    }

    @Override
    public void info(CharSequence message, Throwable t) {
        push();
        delegate.info(message, t);
        pop();
    }

    @Override
    public void info(Object message) {
        push();
        delegate.info(message);
        pop();
    }

    @Override
    public void info(Object message, Throwable t) {
        push();
        delegate.info(message, t);
        pop();
    }

    @Override
    public void info(String message) {
        push();
        delegate.info(message);
        pop();
    }

    @Override
    public void info(String message, Object... params) {
        push();
        delegate.info(message, params);
        pop();
    }

    @Override
    public void info(String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.info(message, paramSuppliers);
        pop();
    }

    @Override
    public void info(String message, Throwable t) {
        push();
        delegate.info(message, t);
        pop();
    }

    @Override
    public void info(Supplier<?> msgSupplier) {
        push();
        delegate.info(msgSupplier);
        pop();
    }

    @Override
    public void info(Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.info(msgSupplier, t);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0) {
        push();
        delegate.info(marker, message, p0);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0, Object p1) {
        push();
        delegate.info(marker, message, p0, p1);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0, Object p1, Object p2) {
        push();
        delegate.info(marker, message, p0, p1, p2);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.info(marker, message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.info(marker, message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.info(marker, message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.info(marker, message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.info(marker, message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.info(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void info(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.info(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public void info(String message, Object p0) {
        push();
        delegate.info(message, p0);
        pop();
    }

    @Override
    public void info(String message, Object p0, Object p1) {
        push();
        delegate.info(message, p0, p1);
        pop();
    }

    @Override
    public void info(String message, Object p0, Object p1, Object p2) {
        push();
        delegate.info(message, p0, p1, p2);
        pop();
    }

    @Override
    public void info(String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.info(message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void info(String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.info(message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void info(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.info(message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void info(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.info(message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void info(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.info(message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void info(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.info(message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void info(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.info(message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public boolean isDebugEnabled() {
        return delegate.isDebugEnabled();
    }

    @Override
    public boolean isDebugEnabled(Marker marker) {
        return delegate.isDebugEnabled(marker);
    }

    @Override
    public boolean isEnabled(Level level) {
        return delegate.isEnabled(level);
    }

    @Override
    public boolean isEnabled(Level level, Marker marker) {
        return delegate.isEnabled(level, marker);
    }

    @Override
    public boolean isErrorEnabled() {
        return delegate.isErrorEnabled();
    }

    @Override
    public boolean isErrorEnabled(Marker marker) {
        return delegate.isErrorEnabled(marker);
    }

    @Override
    public boolean isFatalEnabled() {
        return delegate.isFatalEnabled();
    }

    @Override
    public boolean isFatalEnabled(Marker marker) {
        return delegate.isFatalEnabled(marker);
    }

    @Override
    public boolean isInfoEnabled() {
        return delegate.isInfoEnabled();
    }

    @Override
    public boolean isInfoEnabled(Marker marker) {
        return delegate.isInfoEnabled(marker);
    }

    @Override
    public boolean isTraceEnabled() {
        return delegate.isTraceEnabled();
    }

    @Override
    public boolean isTraceEnabled(Marker marker) {
        return delegate.isTraceEnabled(marker);
    }

    @Override
    public boolean isWarnEnabled() {
        return delegate.isWarnEnabled();
    }

    @Override
    public boolean isWarnEnabled(Marker marker) {
        return delegate.isWarnEnabled(marker);
    }

    @Override
    public void log(Level level, Marker marker, Message msg) {
        push();
        delegate.log(level, marker, msg);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, Message msg, Throwable t) {
        push();
        delegate.log(level, marker, msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void log(Level level, Marker marker, MessageSupplier msgSupplier) {
        push();
        delegate.log(level, marker, msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void log(Level level, Marker marker, MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.log(level, marker, msgSupplier, t);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, CharSequence message) {
        push();
        delegate.log(level, marker, message);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, CharSequence message, Throwable t) {
        push();
        delegate.log(level, marker, message, t);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, Object message) {
        push();
        delegate.log(level, marker, message);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, Object message, Throwable t) {
        push();
        delegate.log(level, marker, message, t);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message) {
        push();
        delegate.log(level, marker, message);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object... params) {
        push();
        delegate.log(level, marker, message, params);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.log(level, marker, message, paramSuppliers);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Throwable t) {
        push();
        delegate.log(level, marker, message, t);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, Supplier<?> msgSupplier) {
        push();
        delegate.log(level, marker, msgSupplier);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.log(level, marker, msgSupplier, t);
        pop();
    }

    @Override
    public void log(Level level, Message msg) {
        push();
        delegate.log(level, msg);
        pop();
    }

    @Override
    public void log(Level level, Message msg, Throwable t) {
        push();
        delegate.log(level, msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void log(Level level, MessageSupplier msgSupplier) {
        push();
        delegate.log(level, msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void log(Level level, MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.log(level, msgSupplier, t);
        pop();
    }

    @Override
    public void log(Level level, CharSequence message) {
        push();
        delegate.log(level, message);
        pop();
    }

    @Override
    public void log(Level level, CharSequence message, Throwable t) {
        push();
        delegate.log(level, message, t);
        pop();
    }

    @Override
    public void log(Level level, Object message) {
        push();
        delegate.log(level, message);
        pop();
    }

    @Override
    public void log(Level level, Object message, Throwable t) {
        push();
        delegate.log(level, message, t);
        pop();
    }

    @Override
    public void log(Level level, String message) {
        push();
        delegate.log(level, message);
        pop();
    }

    @Override
    public void log(Level level, String message, Object... params) {
        push();
        delegate.log(level, message, params);
        pop();
    }

    @Override
    public void log(Level level, String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.log(level, message, paramSuppliers);
        pop();
    }

    @Override
    public void log(Level level, String message, Throwable t) {
        push();
        delegate.log(level, message, t);
        pop();
    }

    @Override
    public void log(Level level, Supplier<?> msgSupplier) {
        push();
        delegate.log(level, msgSupplier);
        pop();
    }

    @Override
    public void log(Level level, Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.log(level, msgSupplier, t);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0) {
        push();
        delegate.log(level, marker, message, p0);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0, Object p1) {
        push();
        delegate.log(level, marker, message, p0, p1);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0, Object p1, Object p2) {
        push();
        delegate.log(level, marker, message, p0, p1, p2);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.log(level, marker, message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.log(level, marker, message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.log(level, marker, message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.log(level, marker, message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.log(level, marker, message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.log(level, marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void log(Level level, Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.log(level, marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0) {
        push();
        delegate.log(level, message, p0);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0, Object p1) {
        push();
        delegate.log(level, message, p0, p1);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0, Object p1, Object p2) {
        push();
        delegate.log(level, message, p0, p1, p2);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.log(level, message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.log(level, message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.log(level, message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.log(level, message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.log(level, message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.log(level, message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void log(Level level, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.log(level, message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public void printf(Level level, Marker marker, String format, Object... params) {
        push();
        delegate.printf(level, marker, format, params);
        pop();
    }

    @Override
    public void printf(Level level, String format, Object... params) {
        push();
        delegate.printf(level, format, params);
        pop();
    }

    @Override
    public <T extends Throwable> T throwing(Level level, T t) {
        return delegate.throwing(level, t);
    }

    @Override
    public <T extends Throwable> T throwing(T t) {
        return delegate.throwing(t);
    }

    @Override
    public void trace(Marker marker, Message msg) {
        push();
        delegate.trace(marker, msg);
        pop();
    }

    @Override
    public void trace(Marker marker, Message msg, Throwable t) {
        push();
        delegate.trace(marker, msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void trace(Marker marker, MessageSupplier msgSupplier) {
        push();
        delegate.trace(marker, msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void trace(Marker marker, MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.trace(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void trace(Marker marker, CharSequence message) {
        push();
        delegate.trace(marker, message);
        pop();
    }

    @Override
    public void trace(Marker marker, CharSequence message, Throwable t) {
        push();
        delegate.trace(marker, message, t);
        pop();
    }

    @Override
    public void trace(Marker marker, Object message) {
        push();
        delegate.trace(marker, message);
        pop();
    }

    @Override
    public void trace(Marker marker, Object message, Throwable t) {
        push();
        delegate.trace(marker, message, t);
        pop();
    }

    @Override
    public void trace(Marker marker, String message) {
        push();
        delegate.trace(marker, message);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object... params) {
        push();
        delegate.trace(marker, message, params);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.trace(marker, message, paramSuppliers);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Throwable t) {
        push();
        delegate.trace(marker, message, t);
        pop();
    }

    @Override
    public void trace(Marker marker, Supplier<?> msgSupplier) {
        push();
        delegate.trace(marker, msgSupplier);
        pop();
    }

    @Override
    public void trace(Marker marker, Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.trace(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void trace(Message msg) {
        push();
        delegate.trace(msg);
        pop();
    }

    @Override
    public void trace(Message msg, Throwable t) {
        push();
        delegate.trace(msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void trace(MessageSupplier msgSupplier) {
        push();
        delegate.trace(msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void trace(MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.trace(msgSupplier, t);
        pop();
    }

    @Override
    public void trace(CharSequence message) {
        push();
        delegate.trace(message);
        pop();
    }

    @Override
    public void trace(CharSequence message, Throwable t) {
        push();
        delegate.trace(message, t);
        pop();
    }

    @Override
    public void trace(Object message) {
        push();
        delegate.trace(message);
        pop();
    }

    @Override
    public void trace(Object message, Throwable t) {
        push();
        delegate.trace(message, t);
        pop();
    }

    @Override
    public void trace(String message) {
        push();
        delegate.trace(message);
        pop();
    }

    @Override
    public void trace(String message, Object... params) {
        push();
        delegate.trace(message, params);
        pop();
    }

    @Override
    public void trace(String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.trace(message, paramSuppliers);
        pop();
    }

    @Override
    public void trace(String message, Throwable t) {
        push();
        delegate.trace(message, t);
        pop();
    }

    @Override
    public void trace(Supplier<?> msgSupplier) {
        push();
        delegate.trace(msgSupplier);
        pop();
    }

    @Override
    public void trace(Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.trace(msgSupplier, t);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0) {
        push();
        delegate.trace(marker, message, p0);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0, Object p1) {
        push();
        delegate.trace(marker, message, p0, p1);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0, Object p1, Object p2) {
        push();
        delegate.trace(marker, message, p0, p1, p2);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.trace(marker, message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.trace(marker, message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.trace(marker, message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.trace(marker, message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.trace(marker, message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.trace(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void trace(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.trace(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public void trace(String message, Object p0) {
        push();
        delegate.trace(message, p0);
        pop();
    }

    @Override
    public void trace(String message, Object p0, Object p1) {
        push();
        delegate.trace(message, p0, p1);
        pop();
    }

    @Override
    public void trace(String message, Object p0, Object p1, Object p2) {
        push();
        delegate.trace(message, p0, p1, p2);
        pop();
    }

    @Override
    public void trace(String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.trace(message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void trace(String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.trace(message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void trace(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.trace(message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void trace(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.trace(message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void trace(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.trace(message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void trace(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.trace(message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void trace(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.trace(message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public EntryMessage traceEntry() {
        return delegate.traceEntry();
    }

    @Override
    public EntryMessage traceEntry(String format, Object... params) {
        return delegate.traceEntry(format, params);
    }

    @Override
    public EntryMessage traceEntry(Supplier<?>... paramSuppliers) {
        return delegate.traceEntry(paramSuppliers);
    }

    @Override
    public EntryMessage traceEntry(String format, Supplier<?>... paramSuppliers) {
        return delegate.traceEntry(format, paramSuppliers);
    }

    @Override
    public EntryMessage traceEntry(Message message) {
        return delegate.traceEntry(message);
    }

    @Override
    public void traceExit() {
        delegate.traceExit();
    }

    @Override
    public <R> R traceExit(R result) {
        return delegate.traceExit(result);
    }

    @Override
    public <R> R traceExit(String format, R result) {
        return delegate.traceExit(format, result);
    }

    @Override
    public void traceExit(EntryMessage message) {
        push();
        delegate.traceExit(message);
        pop();
    }

    @Override
    public <R> R traceExit(EntryMessage message, R result) {
        return delegate.traceExit(message, result);
    }

    @Override
    public <R> R traceExit(Message message, R result) {
        return delegate.traceExit(message, result);
    }

    @Override
    public void warn(Marker marker, Message msg) {
        push();
        delegate.warn(marker, msg);
        pop();
    }

    @Override
    public void warn(Marker marker, Message msg, Throwable t) {
        push();
        delegate.warn(marker, msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void warn(Marker marker, MessageSupplier msgSupplier) {
        push();
        delegate.warn(marker, msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void warn(Marker marker, MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.warn(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void warn(Marker marker, CharSequence message) {
        push();
        delegate.warn(marker, message);
        pop();
    }

    @Override
    public void warn(Marker marker, CharSequence message, Throwable t) {
        push();
        delegate.warn(marker, message, t);
        pop();
    }

    @Override
    public void warn(Marker marker, Object message) {
        push();
        delegate.warn(marker, message);
        pop();
    }

    @Override
    public void warn(Marker marker, Object message, Throwable t) {
        push();
        delegate.warn(marker, message, t);
        pop();
    }

    @Override
    public void warn(Marker marker, String message) {
        push();
        delegate.warn(marker, message);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object... params) {
        push();
        delegate.warn(marker, message, params);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.warn(marker, message, paramSuppliers);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Throwable t) {
        push();
        delegate.warn(marker, message, t);
        pop();
    }

    @Override
    public void warn(Marker marker, Supplier<?> msgSupplier) {
        push();
        delegate.warn(marker, msgSupplier);
        pop();
    }

    @Override
    public void warn(Marker marker, Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.warn(marker, msgSupplier, t);
        pop();
    }

    @Override
    public void warn(Message msg) {
        push();
        delegate.warn(msg);
        pop();
    }

    @Override
    public void warn(Message msg, Throwable t) {
        push();
        delegate.warn(msg, t);
        pop();
    }

    @Override
    @Deprecated
    public void warn(MessageSupplier msgSupplier) {
        push();
        delegate.warn(msgSupplier);
        pop();
    }

    @Override
    @Deprecated
    public void warn(MessageSupplier msgSupplier, Throwable t) {
        push();
        delegate.warn(msgSupplier, t);
        pop();
    }

    @Override
    public void warn(CharSequence message) {
        push();
        delegate.warn(message);
        pop();
    }

    @Override
    public void warn(CharSequence message, Throwable t) {
        push();
        delegate.warn(message, t);
        pop();
    }

    @Override
    public void warn(Object message) {
        push();
        delegate.warn(message);
        pop();
    }

    @Override
    public void warn(Object message, Throwable t) {
        push();
        delegate.warn(message, t);
        pop();
    }

    @Override
    public void warn(String message) {
        push();
        delegate.warn(message);
        pop();
    }

    @Override
    public void warn(String message, Object... params) {
        push();
        delegate.warn(message, params);
        pop();
    }

    @Override
    public void warn(String message, Supplier<?>... paramSuppliers) {
        push();
        delegate.warn(message, paramSuppliers);
        pop();
    }

    @Override
    public void warn(String message, Throwable t) {
        push();
        delegate.warn(message, t);
        pop();
    }

    @Override
    public void warn(Supplier<?> msgSupplier) {
        push();
        delegate.warn(msgSupplier);
        pop();
    }

    @Override
    public void warn(Supplier<?> msgSupplier, Throwable t) {
        push();
        delegate.warn(msgSupplier, t);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0) {
        push();
        delegate.warn(marker, message, p0);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0, Object p1) {
        push();
        delegate.warn(marker, message, p0, p1);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0, Object p1, Object p2) {
        push();
        delegate.warn(marker, message, p0, p1, p2);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.warn(marker, message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.warn(marker, message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.warn(marker, message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.warn(marker, message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.warn(marker, message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.warn(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void warn(Marker marker, String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.warn(marker, message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }

    @Override
    public void warn(String message, Object p0) {
        push();
        delegate.warn(message, p0);
        pop();
    }

    @Override
    public void warn(String message, Object p0, Object p1) {
        push();
        delegate.warn(message, p0, p1);
        pop();
    }

    @Override
    public void warn(String message, Object p0, Object p1, Object p2) {
        push();
        delegate.warn(message, p0, p1, p2);
        pop();
    }

    @Override
    public void warn(String message, Object p0, Object p1, Object p2, Object p3) {
        push();
        delegate.warn(message, p0, p1, p2, p3);
        pop();
    }

    @Override
    public void warn(String message, Object p0, Object p1, Object p2, Object p3, Object p4) {
        push();
        delegate.warn(message, p0, p1, p2, p3, p4);
        pop();
    }

    @Override
    public void warn(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5) {
        push();
        delegate.warn(message, p0, p1, p2, p3, p4, p5);
        pop();
    }

    @Override
    public void warn(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6) {
        push();
        delegate.warn(message, p0, p1, p2, p3, p4, p5, p6);
        pop();
    }

    @Override
    public void warn(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7) {
        push();
        delegate.warn(message, p0, p1, p2, p3, p4, p5, p6, p7);
        pop();
    }

    @Override
    public void warn(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8) {
        push();
        delegate.warn(message, p0, p1, p2, p3, p4, p5, p6, p7, p8);
        pop();
    }

    @Override
    public void warn(String message, Object p0, Object p1, Object p2, Object p3, Object p4, Object p5, Object p6, Object p7, Object p8, Object p9) {
        push();
        delegate.warn(message, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        pop();
    }
}
