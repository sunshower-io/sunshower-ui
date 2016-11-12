package io.hasli.hal.aws;


import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.ec2.AmazonEC2Client;
import com.amazonaws.services.ec2.model.RunInstancesRequest;
import io.hasli.vault.api.VaultService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.UUID;

/**
 * Created by haswell on 11/5/16.
 */

@Path("hal/deploy/aws")
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML
})
public class AwsComputeService {


    @Inject
    private VaultService vault;

    @POST
    @Path("")
    public UUID deploy(DeploymentRequest request) {
        final AmazonEC2Client client =
                new AmazonEC2Client(getCredentials());

        client.setRegion(Region.getRegion(Regions.US_WEST_2));

        final RunInstancesRequest instancesRequest =
                new RunInstancesRequest();

        instancesRequest.withImageId("ami-fa91319a")
                .withInstanceType("t2.small")
                .withMinCount(1)
                .withMaxCount(1)
                .withKeyName("default")
                .withSecurityGroups("default");

        client.runInstances(instancesRequest);
        return UUID.randomUUID();
    }


    private AWSCredentials getCredentials() {
        return new BasicAWSCredentials(
                "AKIAIFJ27HM6XGUVTNWQ",
                "rgVTl5kP5+3U3IaDUtP1MDNvX9mdUG9dK6vgDD3Q"
        );
    }
}
