import {} from 'jasmine';
import any = jasmine.any;
import 'aurelia-polyfills';
import {Container} from "aurelia-framework";
import {Registry} from "common/lib/utils/registry";
import {EditorContext, Canvas} from 'common/lib/canvas/core/canvas';
import {initialize} from 'aurelia-pal-browser';

import {VirtualCloud} from "apps/workspaces/model/components/cloud";
import {ApplicationDeployment} from "apps/workspaces/model/components/deployment";
import {InfrastructureNode} from "apps/workspaces/model/components/infrastructure-node";

import {
    DraftboardManager,
    Draftboard
} from "apps/workspaces/services/draftboard/draftboard";
import {ActionManager} from "common/lib/canvas/actions/action-service";


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
        canvas = new Canvas(containerElement, registry, new ActionManager());
        registry = container.get(Registry);

        context = {
            host: null,
            graph: canvas,
            offset: {top: 0, left: 0},
            location: {x: 0, y: 0}
        };
        draftboardManager.setFocusedDraftboard(new Draftboard(canvas));
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