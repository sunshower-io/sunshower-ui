package io.hasli.web.preferences;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by wabbus on 2/3/17.
 */
@XmlRootElement(name = "draftboard")
public class DraftboardPreferences {

    @XmlAttribute
    private boolean leftToggled = true;


    @XmlAttribute
    private boolean rightToggled = true;


    public boolean isLeftToggled() {
        return leftToggled;
    }

    public void setLeftToggled(boolean leftToggled) {
        this.leftToggled = leftToggled;
    }

    public boolean isRightToggled() {
        return rightToggled;
    }

    public void setRightToggled(boolean rightToggled) {
        this.rightToggled = rightToggled;
    }
}
