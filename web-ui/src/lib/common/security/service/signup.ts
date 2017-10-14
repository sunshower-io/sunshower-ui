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
                method: 'put',
                body: JSON.stringify(user.toJSON())
            })
    }

    listPending() : Promise<RegistrationRequest[]> {
        return this.client.fetch('signup')
            .then(response => response.json() as any)
            .then(data => data.map(t => new RegistrationRequest(t)))
    }

    listActive() : Promise<User[]> {
        return this.client.fetch('security/users/status/true')
            .then(response => response.json() as any)
            .then(data => data.map(t => new User(t)))
    }

    listInactive() : Promise<User[]> {
        return this.client.fetch('security/users/status/false')
            .then(response => response.json() as any)
    }

    approve(requestId: string) : Promise<void> {
        return this.client.fetch(`signup/${requestId}/approve`)
            .then(response => {
            return null;
        })
    }

    revoke(userId: string) : Promise<void> {
        return this.client.fetch(`signup/${userId}/revoke`)
            .then(response => {
            return null;
        })
    }

}