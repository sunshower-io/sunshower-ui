import 'jquery'
import 'fetch';
import {Aurelia} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {LocalStorage, createStorage} from "./storage/local/local-storage";
import {AuthenticationContextHolder, User, AuthenticationContext} from "./model/core/security/index";

export function param(name) {
    return decodeURIComponent((new RegExp(
        '[?|&]' +
        name +
        '=' +
        '([^&;]+?)(&|#|;|$)')
            .exec(location.search) ||
        [null, ''])[1].replace(/\+/g, '%20')) || null;
}

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    let container = aurelia.container,
        http = new HttpClient();

    http.configure(config => {
        config
            .useStandardConfiguration()
            .withBaseUrl('/hasli/api/v1/')
            .withDefaults({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
    });



    let storage = createStorage(),
        tokenHolder = new AuthenticationContextHolder(http, storage);



    container.registerInstance(
        LocalStorage,
        createStorage()
    );
    //
    // container.registerInstance(HttpClient, http);

    http.fetch('initialize/active')
        .then(data => data.json())
        .then(data => {
            if(!data.value) {
                aurelia.start().then(() => aurelia.setRoot('initialize/initialize'))
            } else {
                let token = param('token'),
                    remember = param('remember');
                tokenHolder.validate(token).then(context => {
                    container.registerInstance(User, context.user);
                    container.registerInstance(AuthenticationContext, context);
                    let authenticatedClient = new HttpClient();
                    authenticatedClient.configure(config => {
                        config
                            .useStandardConfiguration()
                            .withBaseUrl('/hasli/api/v1/')
                            .withDefaults({
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                }
                            })
                    });
                    container.registerInstance(HttpClient, authenticatedClient);
                    tokenHolder.set(context, "true" && remember === "true");
                    aurelia.start().then(() => aurelia.setRoot('app'));
                }).catch(a => {
                    container.registerInstance(HttpClient, http);
                    aurelia.start().then(() => aurelia.setRoot('auth/auth'));
                });

            }
        });
}
