package io.hasli.web.preferences;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;


/**
 * Created by gumerman on 2/3/17.
 */
@Path("preferences")
@Consumes({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML,
})
@Produces({
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_XML,
})
public class DefaultPreferencesService {

    private static Preferences preferences;

    static {
        preferences = new Preferences();
    }


    @GET
    @Path("hello/{name}")
    public String sayHello(@PathParam("name") String name) {
        return "Hai from Wab, " + name;
    }

    @GET
    @Path("draftboard")
    public DraftboardPreferences getDraftboardPreferences() {
        return preferences.getDraftboardPreferences();
    }

    @POST
    @Path("draftboard")
    public void setDraftboardPreferences(DraftboardPreferences values) {
        preferences.setDraftboardPreferences(values);
    }


}
