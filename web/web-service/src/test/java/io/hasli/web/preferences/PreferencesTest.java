package io.hasli.web.preferences;

import io.hasli.barometer.jaxrs.SerializationAware;
import io.hasli.barometer.jaxrs.SerializationTestCase;
import io.hasli.barometer.spring.BarometerRunner;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;

import javax.inject.Inject;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Created by gumerman on 2/3/17.
 */

@RunWith(BarometerRunner.class)
@ContextConfiguration(classes = PreferencesTest.class)
public class PreferencesTest extends SerializationTestCase {

    @Inject
    private DefaultPreferencesService preferencesService;


    public PreferencesTest() {
        super(SerializationAware.Format.JSON, Preferences.class, HashMap.class);
    }

    @Bean
    public DefaultPreferencesService service() {

        return new DefaultPreferencesService();
    }


    @Test
    public void ensureDraftboardPreferencesSave() {
        final DraftboardPreferences draftboardPreferences = new DraftboardPreferences();
        draftboardPreferences.setLeftToggled(true);
        draftboardPreferences.setRightToggled(true);
        preferencesService.setDraftboardPreferences(draftboardPreferences);
    }

    @Test
    public void ensureDraftboardPreferencesCanBeRetrieved() {
        final DraftboardPreferences draftboardPreferences = new DraftboardPreferences();
        draftboardPreferences.setLeftToggled(true);
        draftboardPreferences.setRightToggled(true);
        preferencesService.setDraftboardPreferences(draftboardPreferences);
        write(preferencesService.getDraftboardPreferences(), System.out);

        //{"region":{"values":{"entry":[{"key":"leftToggled","value":"true"}]}}}
    }


}