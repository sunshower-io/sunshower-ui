import {} from 'jasmine';
import any = jasmine.any;
import 'aurelia-polyfills';
import {Container} from "aurelia-framework";
import {Registry} from "utils/registry";
import {EditorContext, Canvas} from "canvas/core/canvas";
import {initialize} from 'aurelia-pal-browser';

import {VirtualCloud} from "component/model/cloud";
import {ApplicationDeployment} from "component/model/deployment";
import {InfrastructureNode} from "component/model/infrastructure-node";

import {
    DraftboardManager,
    Draftboard
} from "component/draftboard/draftboard";
import {ActionManager} from "canvas/actions/action-service";


describe('an application deployment', () => {

    initialize();

    let canvas: Canvas= null,
        registry: Registry,
        container: Container,
        context: EditorContext = null,
        draftboardManager: DraftboardManager,
        containerElement : HTMLElement;



    beforeEach(() => {
        containerElement = document.createElement('div');
        container = new Container();
        draftboardManager = container.get(DraftboardManager);
        canvas = new Canvas(containerElement, new ActionManager())
        registry = container.get(Registry);

        context = {
            host: null,
            graph: canvas,
            offset: {top: 0, left: 0},
            location: {x: 0, y: 0}
        };

        draftboardManager.setFocusedDraftboard(new Draftboard(canvas));
    });



    it('should construct the correct node hierarchy when deployment.satisfy() is invoked', () => {
        let deployment = new ApplicationDeployment(registry, '');
        deployment.satisfy(context);
        expect(deployment.getChildren().length).toBe(0);
        expect(deployment.getPredecessors().length).toBe(1);
        let hostInfrastructure = deployment.getPredecessors()[0];
        expect(hostInfrastructure).toEqual(any(InfrastructureNode));
        expect(hostInfrastructure.getPredecessors().length).toBe(1);
        let cloud = hostInfrastructure.getPredecessors()[0];
        expect(cloud).toEqual(any(VirtualCloud));
    });

    it('should be able to open and close a graph transaction', () => {

        context.graph.getModel().beginUpdate();
        context.graph.getModel().endUpdate();
    });

    it('should have a truthy model', () => {
        expect(context.graph.getModel()).toBeTruthy();
    });


    it('should construct the draftboard manager correctly', () => {
        expect(draftboardManager).toBeTruthy();
    });



});