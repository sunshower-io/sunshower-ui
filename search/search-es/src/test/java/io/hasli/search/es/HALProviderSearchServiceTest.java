package io.hasli.search.es;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.ec2.AmazonEC2AsyncClient;
import com.amazonaws.services.ec2.AmazonEC2Client;
import com.amazonaws.services.ec2.model.DescribeImagesRequest;
import com.amazonaws.services.ec2.model.DescribeImagesResult;
import com.amazonaws.services.ec2.model.Image;
<<<<<<< HEAD
import org.junit.Ignore;
=======
>>>>>>> provisioning
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by haswell on 11/5/16.
 */
@Ignore
public class HALProviderSearchServiceTest {


    @Test
    public void ensureListingAndIndexingAMIsWorks() {
        DescribeImagesRequest request = new DescribeImagesRequest();
        final AmazonEC2Client client = new AmazonEC2AsyncClient(getCredentials());
        DescribeImagesResult describeImagesResult = client.describeImages();
        List<Image> images = describeImagesResult.getImages();
        for(Image image : images) {
            System.out.println(image);
        }
    }


    private AWSCredentials getCredentials() {
        return new BasicAWSCredentials(
                "AKIAIFJ27HM6XGUVTNWQ",
                "rgVTl5kP5+3U3IaDUtP1MDNvX9mdUG9dK6vgDD3Q"
        );

    }

}