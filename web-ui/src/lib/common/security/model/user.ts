import {Token} from './token';


export class Principal {
    id                  : string;
    active              : boolean;
    lastName            : string;
    firstName           : string;
    username            : string;
    emailAddress        : string;
    phoneNumber         : string;
    roles               : Role[];

    constructor(value?: any) {
        Object.assign(this, value);
        if (value) {
            this.emailAddress = value["email-address"];
            this.phoneNumber = value["phone-number"];
            this.firstName = value["first-name"];
            this.lastName = value["last-name"];
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
    constructor(
        public readonly authority ?:string
    ) {

    }
}


export interface ProtectedObject {
    rolesAllowed            : Role[];
    rolesDenied             : Role[];
}

export class RegistrationRequest {

    id                  : string;
    username            : string;
    password            : string;
    phoneNumber         : string;
    emailAddress        : string;
    lastName            : string;
    firstName           : string;

    constructor(value ?: any) {
        Object.assign(this, value);
        if (value) {
            this.id = value["registration-id"];
            this.lastName = value["last-name"];
            this.firstName = value["first-name"];
            this.phoneNumber = value["phone-number"];
            this.emailAddress = value["email-address"];
        }
    }


    toJSON() {
        return {
            "registration-id": this.id,
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