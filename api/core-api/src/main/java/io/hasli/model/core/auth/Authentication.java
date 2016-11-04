package io.hasli.model.core.auth;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by haswell on 10/26/16.
 */
@XmlRootElement
public class Authentication {

    @XmlElement
    private User user;

    @XmlElement
    private Token token;


    public Authentication() {

    }

    public Authentication(User user, Token token) {
        this.user = user;
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Token getToken() {
        return token;
    }

    public void setToken(Token token) {
        this.token = token;
    }
}