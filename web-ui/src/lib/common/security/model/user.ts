import {Token} from './token';


export class Principal {
    id                  : string;
    active              : boolean;
    username            : string;
    emailAddress        : string;
    roles               : Role[];

    constructor(value?: any) {
        Object.assign(this, value);
        if(value) {
            this.emailAddress = value["email-address"];
        }
    }
}



export class Authentication {
    token       :Token;
    user        :Principal;

    constructor(value?: any) {
        if(value) {
            this.token = new Token(value.token);
            this.user = new Principal(value.principal);
        }
    }
}

export class Role {
    authority:string;
}


export class RegistrationRequest {


    username            : string;
    password            : string;
    phoneNumber         : string;
    emailAddress        : string;
    lastName            : string;
    firstName           : string;

    constructor(value ?: any) {
        Object.assign(this, value);
    }


    toJson() {
        return {
            username: this.username,
            password: this.password,
            "phone-number": this.phoneNumber,
            "email-address" : this.emailAddress,
            "first-name": this.firstName,
            "last-name": this.lastName
        };
    }

}

export class AuthenticationRequest {
    public username: string;
    public password: string;

    constructor(value?: any) {
        Object.assign(this, value);
    }
}