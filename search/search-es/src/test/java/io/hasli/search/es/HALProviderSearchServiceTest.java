package io.hasli.search.es;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.ec2.AmazonEC2AsyncClient;
import com.amazonaws.services.ec2.AmazonEC2Client;
import com.amazonaws.services.ec2.model.DescribeImagesRequest;
import com.amazonaws.services.ec2.model.DescribeImagesResult;
import com.amazonaws.services.ec2.model.Image;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.node.Node;
import org.elasticsearch.node.NodeValidationException;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;
import java.util.List;
/**
 * Created by haswell on 11/5/16.
 */
@ContextConfiguration(classes = HALProviderSearchServiceTest.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class HALProviderSearchServiceTest {

    @Bean
    public Node elasticSearchNode() throws NodeValidationException {

        final Settings settings = Settings.builder()
                .put("path.home", "/tmp/hasli-es")
                .build();
        Node node = new Node(settings);
        return node.start();
//        final Settings.Builder settingsBuilder = Settings.builder();
//
////        settingsBuilder.put("node.name", ElasticSearchConfig.NODE_NAME);
////        settingsBuilder.put("path.data", ElasticSearchConfig.DATA_PATH);
////        settingsBuilder.put("http.enabled", false);
////
////        Settings settings = settingsBuilder.build();
////
////        node = NodeBuilder.nodeBuilder()
////                .settings(settings)
////                .clusterName(ElasticSearchConfig.CLUSTER_NAME)
////                .data(true).local(true).node();
////        return node;

    }

    @Inject
    private Node node;


    @Test
    public void ensureListingAndIndexingAMIsWorks() {


    }


    private AWSCredentials getCredentials() {
        return new BasicAWSCredentials(
                "AKIAIFJ27HM6XGUVTNWQ",
                "rgVTl5kP5+3U3IaDUtP1MDNvX9mdUG9dK6vgDD3Q"
        );

    }

}