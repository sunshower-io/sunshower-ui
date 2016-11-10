package io.hasli.hfs.service;

import io.hasli.barometer.rs.module.JAXRS;
import io.hasli.hfs.api.MerkleNode;
import io.hasli.hfs.api.ObjectDescriptor;
import io.hasli.hfs.api.SwarmService;
import io.hasli.model.core.crypto.Multihash;
import io.hasli.test.security.rs.MoxyOverrideProvider;
import org.mockito.Mockito;
import static org.mockito.BDDMockito.*;

import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;

/**
 * Created by haswell on 11/9/16.
 */
@Configuration
public class TestConfiguration extends JAXRS {

    @Bean
    public SwarmService swarmService() {
        MerkleNode mock = mock(MerkleNode.class);
        given(mock.getHash()).willReturn(
                "QmX8Mu4BLbLfiypDNiXZJbMLoxTZCWczz8rGq3hwRHSCFS");

        final ObjectDescriptor descriptor = new ObjectDescriptor(mock);
        SwarmService service = Mockito.mock(DefaultSwarmService.class);
        given(service.save(any(InputStream.class))).willAnswer(invocation -> {
            InputStream is = (InputStream) invocation.getArguments()[0];
            is.close();
            return descriptor;
        });
//        given(service.save(any(InputStream.class)))
//                .willReturn(descriptor);
        return service;
    }

    @Bean
    public MoxyOverrideProvider moxyProvider() {
        return new MoxyOverrideProvider();
    }

}
