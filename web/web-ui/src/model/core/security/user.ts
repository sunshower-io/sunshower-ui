import {Token} from './';

export class AuthenticationContext {
    user:User;
    token:Token;
}

export class User {

    id:string;

    firstname:string;

    lastname:string;

    username:string;

    password:string;

    email:string;


    token:Token;
}