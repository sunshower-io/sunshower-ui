package io.hasli.hfs.configuration;

import io.hasli.common.rs.MapAdapter;
import org.eclipse.persistence.oxm.annotations.XmlPath;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by haswell on 11/9/16.
 */
@XmlRootElement(name = "configuration-values")
public class ConfigurationValues {

    @XmlPath(".")
    @XmlJavaTypeAdapter(MapAdapter.class)
    private Map<String, String> values;


    public ConfigurationValues() {
        this.values = new HashMap<>();
    }

    public void set(String key, String value) {
        this.values.put(key, value);
    }


    public Map<String, String> getValues() {
        return values;
    }

    public void setValues(Map<String, String> values) {
        this.values = values;
    }

    public String get(String s) {
        return this.values.get(s);
    }
}
