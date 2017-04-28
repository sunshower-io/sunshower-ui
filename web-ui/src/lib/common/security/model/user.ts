import {Token} from './token';

export class AuthenticationContext {
    user        :User;
    token       :Token;
}

export class Role {
    authority:string;
}

export class Roles {
    roles ?: Role[];
}

export class User {

    id:string;

    firstname:string;

    lastname:string;

    username:string;

    password:string;

    token:Token;

    emailAddress:string;

    phoneNumber:string;

    image:string;

    roles?: Roles
}