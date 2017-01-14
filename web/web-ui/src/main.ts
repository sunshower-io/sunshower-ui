import 'jquery'
import 'fetch';
import {Aurelia} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {LocalStorage, createStorage} from "./storage/local/local-storage";
import {
    AuthenticationContextHolder,
    User,
    AuthenticationContext
} from "./model/core/security/index";

import {DialogConfiguration} from "aurelia-dialog";
import {
    SemanticUIRenderer
} from "common/renderers/semantic-ui-renderer";
import {Renderer} from "aurelia-dialog";

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
        .globalResources([
            'common/elements/menu',
            'common/sidenav/sidenav',
            'common/elements/tree/tree',
            'common/banner/banner',
            'common/carousel/carousel',
            'common/folio/folio',
            'common/property-editor/property-editor',
        ])
        .plugin('aurelia-dialog', (config: DialogConfiguration) => {
            config.useRenderer(SemanticUIRenderer);
        }).developmentLogging();

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

    http.fetch('initialize/active')
        .then(data => data.json() as any)
        .then(data => {
            if (!data.value) {
                container.registerInstance(HttpClient, http);
                aurelia.start().then(() => aurelia.setRoot('initialize/initialize'))
            } else {
                let token = storage.get('X-AUTH-TOKEN') || param('token');
                tokenHolder.validate(token).then(context => {
                    container.registerInstance(User, context.user);
                    container.registerInstance(AuthenticationContext, context);
                    http.defaults.headers['X-AUTH-TOKEN'] = token;
                    let authenticatedClient = new HttpClient();
                    authenticatedClient.configure(config => {
                        config
                            .useStandardConfiguration()
                            .withBaseUrl('/hasli/api/v1/')
                            .withDefaults({
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'X-AUTH-TOKEN': token
                                }
                            })
                    });
                    tokenHolder.set(context, false);
                    container.registerInstance(HttpClient, authenticatedClient);
                    aurelia.start().then(() => aurelia.setRoot('app'));
                }).catch(a => {
                    container.registerInstance(HttpClient, http);
                    aurelia.start().then(() => aurelia.setRoot('auth/auth'));
                });

            }
        });
}