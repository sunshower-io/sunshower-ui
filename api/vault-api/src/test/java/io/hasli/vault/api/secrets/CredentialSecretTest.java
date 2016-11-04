package io.hasli.vault.api.secrets;

import io.hasli.barometer.jaxrs.SerializationAware;
import io.hasli.barometer.jaxrs.SerializationTestCase;
import io.hasli.vault.api.Secret;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by haswell on 11/2/16.
 */
public class CredentialSecretTest extends SerializationTestCase {

    public CredentialSecretTest() {
        super(SerializationAware.Format.JSON, CredentialSecret.class, Secret.class);
    }

    @Test
    public void ensureSerializationWorks() {
        Secret secret = new CredentialSecret();
        secret.set("frap", "adap");
        System.out.println(write(secret));

    }
}