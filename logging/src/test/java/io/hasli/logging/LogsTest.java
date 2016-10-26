package io.hasli.logging;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by haswell on 10/26/16.
 */
@LogRegion(name = "coolbeans")
public class LogsTest {

    @Test
    public void ensureLoggingWorksForSingleAppender() {
        Logger logger = Logs.getInstance(null).getLogger(LogsTest.class);
        for(int i = 0; i < 100; i++) {

            logger.error("sup");
        }

    }

}