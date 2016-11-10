package io.hasli.hfs.service;

import io.hasli.hfs.api.MerkleNode;
import org.junit.Ignore;
import org.junit.Test;

import java.io.IOException;

/**
 * Created by haswell on 11/8/16.
 */
public class HFSClientTest {


    @Test
    @Ignore
    public void ensureCanUploadFileToAgent() throws IOException {
        HFSClient HFSClient = new HFSClient("/ip4/127.0.0.1/tcp/5001");
//        NamedStreamable.FileWrapper fwraper = new NamedStreamable.FileWrapper(
//                new File(ClassLoader.getSystemResource("jdk1.8.zip").getFile())
//        );
        NamedStreamable.ByteArrayWrapper file = new NamedStreamable.ByteArrayWrapper("hello.txt", "G'day world! IPFS rocks!".getBytes());
        MerkleNode addResult = HFSClient.add(file);
        System.out.println(addResult.hash.toString());
    }

}