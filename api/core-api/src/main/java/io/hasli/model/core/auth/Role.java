package io.hasli.model.core.auth;

import io.hasli.model.core.entity.AbstractEntity;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Created by haswell on 10/20/16.
 */
@Entity
@XmlRootElement
public class Role extends AbstractEntity<UUID>
        implements GrantedAuthority, Comparable<Role> {


    @Id
    private UUID id;

    @Basic
    private String authority;

    @Basic
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Role parent;

    @OneToMany(mappedBy = "parent")
    private Set<Role> children;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "roles_to_permissions",
            joinColumns = @JoinColumn(
                    name = "role_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "permission_id",
                    referencedColumnName = "id"
            )
    )
    private Set<Permission> permissions;


    public Role() {
        super(UUID.randomUUID());
    }

    public Role(String authority) {
        this(authority, null);
    }

    public Role(String authority, String description) {
        this();
        this.authority = authority;
        this.description = description;
    }


    public Role addPermission(final Permission permission) {
        permission.addRole(this);
        if(this.permissions == null) {
            this.permissions = new LinkedHashSet<>();
        }
        this.permissions.add(permission);
        return this;
    }

    @Override
    public UUID getId() {
        return id;
    }

    @Override
    protected void setId(UUID id) {
        this.id = id;
    }

    @Override
    public int compareTo(Role o) {
        return 0;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public void addUser(User user) {
        if(this.users == null) {
            this.users = new LinkedHashSet<>();
        }
        this.users.add(user);
    }

    @Override
    protected void setDefaults() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Role)) return false;

        Role role = (Role) o;

        return authority != null ? authority.equals(role.authority) : role.authority == null;

    }

    @Override
    public int hashCode() {
        return authority != null ? authority.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", authority='" + authority + '\'' +
                ", description='" + description + '\'' +
                ", parent=" + parent +
                ", children=" + children +
                ", users=" + users +
                ", permissions=" + permissions +
                '}';
    }
}
