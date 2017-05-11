import {HttpClient} from "aurelia-fetch-client";


import {autoinject} from "aurelia-framework";
import {
    Service,
    ServiceManager
} from "lib/common/service";

import {Principal as User, RegistrationRequest} from "lib/common/security/model/user";


@autoinject
export class SignupService implements Service<User> {


    constructor(private user: User,
                private client: HttpClient,
                private serviceManager: ServiceManager
    ) {

    }

    bind(key: string): Promise<User> {
        return Promise.resolve(this.user)
    }

    create(user: RegistrationRequest) : Promise<Response> {
        return this.client.fetch('signup', {
                method: 'post',
                body: JSON.stringify(this.user)
            }).then(response => response.json() as any)
            .then(response => {
                return null;
            }).catch(er => {
                return er;
        });
    }

    list() : Promise<User[]> {
        return this.client.fetch('signup')
            .then(response => response.json() as any)
            .then(response => {
                return response;
                });
    }

    approve(requestId: string) : Promise<void> {
        return this.client.fetch(`signup/${requestId}/approve`, {
            method: 'post'
        }).then(response => {
            return null;
        })
    }

    revoke(userId: string) : Promise<void> {
        return this.client.fetch(`signup/${userId}/revoke`, {
            method: 'post'
        }).then(response => {
            return null;
        })
    }

}