package io.hasli.model.core.auth;

import io.hasli.model.core.entity.AbstractEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.xml.bind.annotation.*;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "User")
@XmlRootElement(name = "user")
@XmlAccessorType(XmlAccessType.NONE)
public class User extends AbstractEntity<UUID> implements UserDetails {

    @Id
    private UUID id;

    @Transient
    private Details details;

    @XmlAttribute
    private String username;

    @XmlAttribute
    private String firstname;

    @XmlAttribute
    private String lastname;

    @XmlAttribute
    private String emailAddress;

    @XmlAttribute
    private String password;

    @XmlElement
    @XmlElementWrapper(name = "roles")
    @ManyToMany(
            cascade = CascadeType.ALL
    )
    @JoinTable(
            name = "users_to_roles",
            joinColumns = @JoinColumn(
                    name = "user_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id",
                    referencedColumnName = "id"
            )
    )
    private Set<Role> roles;



    public User() {
        super(UUID.randomUUID());
    }

    public User(UUID id, final String username, final String password) {
        super(id);
        this.username = username;
        this.password = password;
    }

    public User(UUID uuid) {
        super(uuid);
    }

    @Override
    public UUID getId() {
        return id;
    }

    @Override
    protected void setId(UUID uuid) {
        this.id = uuid;
    }

    @Override
    protected void setDefaults() {

    }

    public Object getDetails() {
        return details;
    }

    public void setDetails(Details details) {
        this.details = details;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
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
        return roles;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;

        User user = (User) o;

        return id != null ? id.equals(user.id) : user.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", details=" + details +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", emailAddress='" + emailAddress + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public User addRole(Role role) {
        role.addUser(this);
        if(this.roles == null) {
            this.roles = new LinkedHashSet<>();
        }
        this.roles.add(role);
        return this;
    }
}
