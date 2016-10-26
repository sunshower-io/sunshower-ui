import 'jquery'
import 'fetch';
import {Aurelia} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {LocalStorage, createStorage} from "./storage/local/local-storage";


export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    let container = aurelia.container;

    let http = new HttpClient();
    http.configure(config => {
        config
            .useStandardConfiguration()
            .withBaseUrl('/hasli/api/v1/')
            .withDefaults({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
    });

    container.registerInstance(
        LocalStorage,
        createStorage()
    );

    container.registerInstance(HttpClient, http);

    // TODO: Handle authentication logic
    // if authenticated, go directly to home
    // else go to login/signup page
    aurelia.start().then(() => aurelia.setRoot('auth/auth'));
    // aurelia.start().then(() => aurelia.setRoot());
}
