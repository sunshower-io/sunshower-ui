import {} from 'jasmine';
import any = jasmine.any;

import {Registry} from "utils/registry";
import {Canvas} from 'canvas/core/canvas';
import {initialize} from 'aurelia-pal-browser';

import
    DraftboardMarshaller
 from 'component/draftboard/marshallers/marshaller';

import {Draftboard} from "component/draftboard/draftboard";
import {Container} from "aurelia-dependency-injection";
import {Relationship} from "canvas/element/element";
import {ActionManager} from "canvas/actions/action-service";
import {ApplicationDeployment} from "component/model/deployment";
import {InfrastructureNode} from "component/model/infrastructure-node";

describe('a draftboard marshaller', () => {

    let
        canvas                  : Canvas = null,
        container               : Container = null,
        draftboard              : Draftboard = null,
        containerElement        : HTMLElement = null,
        registry                : Registry = null,
        actionManager           : ActionManager = null,
        marshaller              : DraftboardMarshaller = null;

    initialize();


    beforeEach(() => {
        container = new Container();
        registry = container.get(Registry);
        actionManager = container.get(ActionManager);
        containerElement = document.createElement('div');
        canvas = new Canvas(containerElement, registry, actionManager);
        draftboard = new Draftboard(canvas);
        marshaller = new DraftboardMarshaller();
    });


    it('should serialize a single application and node correctly', () => {
        let application = new ApplicationDeployment(),
            host = new InfrastructureNode();
        host.addTo(canvas, null, true);

        host.addElement(application);
        draftboard.addElement(host);
        draftboard.connect(host, application, Relationship.SUCCESSOR);
        let result = marshaller.write(draftboard),
            root = result.get('graph');
    });

});