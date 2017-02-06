package io.hasli.web.preferences;

import javax.xml.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gumerman on 2/3/17.
 */

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name = "preferences")
public class Preferences {


    @XmlElement(name = "main.workspace.draftboard")
    private DraftboardPreferences draftboardPreferences;

    public DraftboardPreferences getDraftboardPreferences() {
        return draftboardPreferences;
    }

    public void setDraftboardPreferences(DraftboardPreferences draftboardPreferences) {
        this.draftboardPreferences = draftboardPreferences;
    }
}
