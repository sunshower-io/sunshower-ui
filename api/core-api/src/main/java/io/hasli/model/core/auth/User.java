package io.hasli.model.core.auth;

import io.hasli.model.core.entity.AbstractEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import java.security.Principal;
import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@Entity
@Table(name = "User")
@XmlRootElement(name = "user")
@XmlAccessorType(XmlAccessType.NONE)
public class User extends AbstractEntity<UUID> implements UserDetails {

    @Transient
    private Details details;

    @XmlAttribute
    private String username;

    @XmlAttribute
    private String emailAddress;

    @XmlAttribute
    private String password;

    public User() {
        super(UUID.randomUUID());
    }

    public User(UUID uuid) {
        super(uuid);
    }

    @Override
    protected void setDefaults() {

    }

    public Details getDetails() {
        return details;
    }

    public void setDetails(Details details) {
        this.details = details;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new Authority("admin"));
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object obj) {
        return false;
    }

    @Override
    public String toString() {
        return null;
    }
}
