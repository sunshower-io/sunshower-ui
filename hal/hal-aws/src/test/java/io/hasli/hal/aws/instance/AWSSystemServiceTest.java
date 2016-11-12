package io.hasli.hal.aws.instance;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.ec2.AmazonEC2Client;
import com.amazonaws.services.ec2.model.RunInstancesRequest;
import com.amazonaws.services.ec2.model.SecurityGroup;
import org.junit.Test;

/**
 * Created by haswell on 11/6/16.
 */
public class AWSSystemServiceTest {


    @Test
    public void ensureDeployingSimpleInstanceWorks() {


    }

    private AWSCredentials getCredentials() {
        return new BasicAWSCredentials(
                "AKIAIFJ27HM6XGUVTNWQ",
                "rgVTl5kP5+3U3IaDUtP1MDNvX9mdUG9dK6vgDD3Q"
        );
    }
}
