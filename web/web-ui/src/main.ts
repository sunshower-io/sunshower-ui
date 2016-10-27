import 'jquery'
import 'fetch';
import {Aurelia} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {LocalStorage, createStorage} from "./storage/local/local-storage";
import {TokenHolder} from "./model/core/security/index";


export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    let container = aurelia.container;

    let http = new HttpClient(),
        storage = createStorage(),
        tokenHolder = new TokenHolder(http, storage);

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

    container.registerInstance(
        LocalStorage,
        createStorage()
    );


    container.registerInstance(HttpClient, http);

    http.fetch('initialize/active')
        .then(data => data.json())
        .then(data => {
            if(!data.value) {
                aurelia.start().then(() => aurelia.setRoot('initialize/initialize'))
            } else {
                console.log("Got one!");
            }
        });

    // alert("Starting");

    // aurelia.start().then(() => aurelia.setRoot('auth/auth'));
}
