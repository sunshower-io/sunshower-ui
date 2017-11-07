import 'jquery'
import 'fetch';
import 'materialize-css';
import {Aurelia} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

import {
    HttpClient as BasicHttpClient
} from 'aurelia-http-client'

import {
    LocalStorage,
    createStorage,
    Map
} from "lib/common/storage";


import {
    AuthenticationContextHolder,
    Principal,
    Authentication
} from "lib/common/security";


import {DialogConfiguration} from "aurelia-dialog";

import {Container} from "aurelia-dependency-injection";
import {MaterializeRenderer} from "./lib/common/resources/custom-elements/materialize-renderer";
import {ApplicationContextHolder} from "./lib/common/application-context";
import Identifiers from "./lib/common/util/identifier";


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
    console.log("Starting...");


    configureResources(aurelia);

    let container = aurelia.container,
        http = new HttpClient();

    configureHttpClient(http);


    let storage = createStorage(),
        tokenHolder = new AuthenticationContextHolder(http, storage);


    container.registerInstance(
        LocalStorage,
        storage
    );

    // http.fetch('initialize/active')
    //     .then(data => data.json() as any)
    //     .then(data => {
    doConfigure(true, http, container, aurelia, storage, tokenHolder);
    // });
}


function registerAnimations(cfg) {
    cfg.registerEffect("slideOut", {
        defaultDuration: 1950,
        calls: [
            [{translateX: ['-100%', '0%']}, 1],
        ]
    });

    cfg.registerEffect('slideIn', {
        defaultDuration: 1950,
        calls: [
            [{translateX: ['0%', '-100%']}, 1],
        ]
    });


    cfg.registerEffect('rotateNeg180', {
        defaultDuration: 1950,
        calls: [
            [{rotateZ: [180, 360]}, 1],
        ]
    });

    cfg.registerEffect('rotate180', {
        defaultDuration: 1950,
        calls: [
            [{rotateZ: [180, 0]}, 1],
        ]
    });

    cfg.registerEffect("slideOver", {
        defaultDuration: 1950,
        calls: [
            [{translateX: '250px'}]
        ]
    });

    cfg.registerEffect("slideBack", {
        defaultDuration: 1950,
        calls: [
            [{translateX: '0px'}]
        ]
    });

}


function configureResources(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .globalResources([
            'lib/resources/custom-elements/loader/loader',
            'lib/common/resources/custom-attributes/roles-allowed',
            'lib/designer/elements/panel',
            'lib/designer/elements/panels',
            'lib/designer/elements/designer/left-panel',
            'lib/designer/elements/designer/right-panel',
            'lib/designer/elements/designer/action-button',
            'lib/resources/custom-elements/misc/top-element',
            'lib/resources/custom-elements/misc/bottom-element',
            'lib/resources/custom-elements/misc/full-element',
            'lib/designer/elements/designer/designer-element',
            'lib/common/resources/custom-elements/nav-bar/navbar',
            'apps/workspaces/resources/custom-elements/navigator/navigator',
            'lib/common/resources/custom-elements/summary-icon/summary-icon',
            'lib/designer/elements/menu-bar/menu-bar',
            'lib/designer/elements/layer-panel/layer-panel',
            'lib/designer/elements/element-panel/element-panel',
            'lib/designer/elements/property-panel/property-panel',
            'lib/designer/elements/terminal-panel/terminal-panel',
            'lib/designer/elements/deployment-panel/deployment-panel'
        ])
        .plugin('aurelia-animator-velocity', cfg => {
            registerAnimations(cfg);
            return cfg;
        })
        .plugin('aurelia-dialog', (config: DialogConfiguration) => {
            config.useRenderer(MaterializeRenderer)
        })
        .developmentLogging();
}


function doConfigure(data: any,
                     http: HttpClient,
                     container: Container,
                     aurelia: Aurelia,
                     storage: Map<string, string>,
                     tokenHolder: AuthenticationContextHolder) {

    if (!data) {
        container.registerInstance(HttpClient, http);
        aurelia.start().then(() => aurelia.setRoot('apps/auth/auth'))
    } else {
        let token = storage.get('X-AUTH-TOKEN') || param('token');
        tokenHolder.validate(token).then(context => {

            let user = context.user,
                token = context.token;

            container.registerInstance(Principal, user);
            container.registerInstance(Authentication, context);
            http.defaults.headers['X-AUTH-TOKEN'] = token;
            let authenticatedClient = new HttpClient(),
                basicClient = new BasicHttpClient();

            Identifiers.initialize(http);

            configureBasicClient(basicClient, container, token.value);


            configureAuthenticatedClient(authenticatedClient, container, token.value);


            tokenHolder.set(context, false);
            container.registerInstance(HttpClient, authenticatedClient);
            container.registerInstance(BasicHttpClient, basicClient);
            aurelia.start().then(() => {
                ApplicationContextHolder.setInstance(aurelia);
                aurelia.setRoot('app')
            });
        }).catch(a => {
            container.registerInstance(HttpClient, http);
            aurelia.start().then(() => aurelia.setRoot('apps/auth/auth'));
        });

    } //end
}

function configureHttpClient(http: HttpClient) {
    http.configure(config => {
        config
            .useStandardConfiguration()
            .withBaseUrl('/sunshower/api/v1/')
            .withDefaults({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
    });
}

function configureAuthenticatedClient(authenticatedClient: HttpClient, container: Container, token: String) {

    authenticatedClient.configure(config => {
        config
            .useStandardConfiguration()
            .withBaseUrl('/sunshower/api/v1/')
            .withDefaults({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token
                }
            });
    });

}

function configureBasicClient(basicClient: BasicHttpClient, container: Container, token: string) {

    basicClient.configure(config => {
            config.withBaseUrl('/sunshower/api/v1/')
                .withHeader('X-AUTH-TOKEN', token);
        }
    );
}
