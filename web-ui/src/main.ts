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
} from "common/lib/storage/local/local-storage";


import {
    AuthenticationContextHolder,
    User,
    AuthenticationContext
} from "common/model/security";


import {DialogConfiguration} from "aurelia-dialog";

import {
    SemanticUIRenderer
} from "common/resources/custom-components/semantic-ui-renderer";
import {ChannelSet} from "common/lib/events";
import {FetchClientInterceptor} from
    "./common/resources/custom-components/fetch-client-errors";
import {EventAggregator} from "aurelia-event-aggregator";
import {ContextResolver} from "common/model/common";
import {Container} from "aurelia-dependency-injection";



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

    http.fetch('initialize/active')
        .then(data => data.json() as any)
        .then(data => {
            doConfigure(data, http, container, aurelia, storage, tokenHolder);
        });
}



function configureResources(aurelia:Aurelia) {
    aurelia.use
        .standardConfiguration()
        .globalResources([
            'common/lib/widget/menu/menu',
            'common/resources/custom-elements/tree/tree',
            'common/resources/nested-application/nested-application'
        ])
        .plugin('aurelia-animator-velocity')
        .plugin('aurelia-dialog', (config: DialogConfiguration) => {
            config.useRenderer(SemanticUIRenderer);
        }).developmentLogging();
}


function doConfigure(
    data:any,
    http:HttpClient,
    container:Container,
    aurelia:Aurelia,
    storage:Map<string, string>,
    tokenHolder:AuthenticationContextHolder
) {

    if (!data.value) {
        container.registerInstance(HttpClient, http);
        aurelia.start().then(() => aurelia.setRoot('initialize/initialize'))
    } else {
        let token = storage.get('X-AUTH-TOKEN') || param('token');
        tokenHolder.validate(token).then(context => {
            container.registerInstance(User, context.user);
            container.registerInstance(AuthenticationContext, context);
            http.defaults.headers['X-AUTH-TOKEN'] = token;
            let authenticatedClient = new HttpClient(),
                basicClient = new BasicHttpClient();


            configureBasicClient(basicClient, container, token);


            configureAuthenticatedClient(authenticatedClient, container, token);


            let channelSet = new ChannelSet(
                `ws://${location.host}/hasli/api/events`,
                encodeURIComponent(token),
                container.get(EventAggregator)
            );
            tokenHolder.set(context, false);
            container.registerInstance(HttpClient, authenticatedClient);
            container.registerInstance(BasicHttpClient, basicClient);
            container.registerInstance(ChannelSet, channelSet);
            aurelia.start().then(() => aurelia.setRoot('app'));
        }).catch(a => {
            container.registerInstance(HttpClient, http);
            aurelia.start().then(() => aurelia.setRoot('apps/auth/auth'));
        });

    } //end
}

function configureHttpClient(http:HttpClient) {
    http.configure(config => {
        config
            .useStandardConfiguration()
            .withBaseUrl('/hasli/api/v1/')
            .withDefaults({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
    });
}

function configureAuthenticatedClient(authenticatedClient:HttpClient, container:Container, token:String) {

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
            .withInterceptor(container.get(FetchClientInterceptor))
    });

}

function configureBasicClient(basicClient:BasicHttpClient, container: Container, token:string) {

    basicClient.configure(config => {
            config.withBaseUrl('/hasli/api/v1/')
                .withInterceptor(
                    container.get(FetchClientInterceptor)
                ).withHeader('X-AUTH-TOKEN', token);
        }
    );
}
