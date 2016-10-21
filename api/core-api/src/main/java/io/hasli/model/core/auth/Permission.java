package io.hasli.model.core.auth;

import io.hasli.model.core.entity.AbstractEntity;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Created by haswell on 10/20/16.
 */
@Entity
public class Permission extends AbstractEntity<UUID> {

    @Id
    private UUID id;

    @Basic
    @Column
    private String name;

    @Basic
    private String description;

    @ManyToMany(
            mappedBy = "permissions"
    )
    private Set<Role> roles;




    public Permission() {
        super(UUID.randomUUID());
    }

    public Permission(final String name) {
        this();
    }

    public void addRole(Role role) {
        if(this.roles == null) {
            this.roles = new LinkedHashSet<>();
        }
        this.roles.add(role);
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
    protected void setDefaults() {

    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Permission)) return false;

        Permission that = (Permission) o;

        return id != null ? id.equals(that.id) : that.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return null;
    }
}
