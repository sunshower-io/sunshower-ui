package io.hasli.model.core;

import io.hasli.barometer.jaxrs.SerializationAware;
import io.hasli.barometer.jaxrs.SerializationTestCase;
import io.hasli.model.core.auth.User;
import org.apache.commons.io.input.ReaderInputStream;
import org.eclipse.persistence.jaxb.rs.MOXyJsonProvider;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;
import org.junit.Test;

import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.StringReader;
import java.lang.annotation.Annotation;
import java.util.UUID;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 10/26/16.
 */
public class ApplicationTest extends SerializationTestCase {
    public ApplicationTest() {
        super(SerializationAware.Format.JSON, Application.class);
    }

    @Test
    public void ensureSerializingApplicationToJsonProducesExpectedResults() {
        Application a = new Application();
        a.setName("Josiah");
        a.addAdministrator(new User(UUID.randomUUID(), "josiah", "haswell"));

        System.out.println(write(a));
    }

    @Test
    public void ensureSerializingWithMoxyWorks() throws IOException {

        String a = "{\"application\":{\"administrators\":[{\"username\":\"asdfasdfasdf\",\"firstname\":\"asdfasdfasdf\",\"lastname\":\"asdfasdfasdf\",\"emailAddress\":\"asdfasdfasdf\",\"password\":\"asdfasdfasdfadsf\"}],\"name\":\"adsfasdfasdf\",\"location\":\"asdfasdfasdfasdf\"}} ";

        MOXyJsonProvider provider = new MOXyJsonProvider();
        provider.setIncludeRoot(true);
        Class clazz = Application.class;

        Application result = (Application) provider.readFrom((Class<Object>)clazz, null, new Annotation[0], MediaType.APPLICATION_JSON_TYPE, new MultivaluedMapImpl<>(), new ReaderInputStream(new StringReader(a)));
        System.out.println(result.getAdministrators());
        System.out.println(result.getName());

    }

    @Test
    public void ensureApplicationCanBeRead() {
        String application = "{\"application\":{" +
                "\"name\":\"Josiah\"," +
                "\"administrators\":[" +
                "   {\"username\":\"josiah\"," +
                "   \"password\":\"haswell\"," +
                "   \"id\":\"0a9e8b25-3f2a-418b-b97a-895a50977c72\"}" +
                "]," +
                "\"id\":\"08574a1e-c404-4c1f-8d8d-2d407b922ccf\"}}";

        Application a = read(application);
        System.out.println(a.getAdministrators());

        assertThat(a.getAdministrators().size(), is(1));

    }


    @Test
    public void ensureServerSideRequestCanBeRead() {
        String request = "{\"application\":{\"administrators\":[{\"username\":\"asdfasdfasdf\",\"firstname\":\"asdfasdfasdf\",\"lastname\":\"asdfasdfasdf\",\"emailAddress\":\"asdfasdfasdf\",\"password\":\"asdfasdfasdfadsf\"}],\"name\":\"adsfasdfasdf\",\"location\":\"asdfasdfasdfasdf\"}} ";
        Application a = read(request);
        System.out.println(a.getAdministrators());

    }
    @Test
    public void ensureRawRequestCanBeRead() {
        String application = "{\"application\":{\"administrators\":[{\"username\":\"asdfasdf\",\"firstname\":\"asdfasdf\",\"lastname\":\"asdfasdf\",\"emailAddress\":\"asdfasdfasdfasdf\",\"password\":\"asdfasdfasdf\"}],\"name\":\"asdfasdf\",\"location\":\"asdfasdf\"}}";
        Application a = read(application);
        assertThat(a.getAdministrators().size(), is(1));
    }
}
