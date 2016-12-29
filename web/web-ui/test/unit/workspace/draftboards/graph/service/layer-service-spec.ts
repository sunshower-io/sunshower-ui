import {} from 'jasmine';
import any = jasmine.any;
import createSpy = jasmine.createSpy;
import createSpyObj = jasmine.createSpyObj;
import {Registry} from 'utils/registry';
import {mxGraph} from "mxgraph";


import 'aurelia-polyfills';
import {Container} from "aurelia-framework";

import {
    ApplicationDeployment
} from 'main/workspace/draftboards/cells/deployment'

import {UUID} from "utils/uuid";
import {
    Draftboard,
    DraftboardManager
} from "elements/draftboard";

import {
    AbstractElement,
    ApplicationElement,
    InfrastructureElement
} from 'elements/elements';

import {VirtualCloud} from 'elements/cloud';

import {Node} from 'main/workspace/draftboards/cells/node';
import {Layer} from 'main/workspace/draftboards/cells/layer';
import {VirtualCloud as VPC} from 'main/workspace/draftboards/cells/cloud';

import {EditorContext} from 'main/workspace/draftboards/editor';
import {LayerService} from 'main/workspace/draftboards/graph/service/layer-service';


class navAware {
    toggleLeft(): boolean {
        return false;
    }

    toggleRight(): boolean {
        return false;
    }


}

describe('a layer service', () => {
    let layerService: LayerService = null,
        graph: mxGraph = null,
        registry: Registry,
        context: EditorContext = null;



    beforeEach(() => {
        let container = new Container(),
            draftboardManager = container.get(DraftboardManager);
        draftboardManager.setFocusedDraftboard(new Draftboard());
        layerService = container.get(LayerService);
        registry = container.get(Registry);
        graph = new mxGraph();
        context = {
            host: new navAware(),
            graph: graph,
            offset: {top: 0, left: 0},
            location: {x: 0, y: 0}
        };
    });

    it('should inject the layer service correctly', () => {
        expect(layerService).toBeTruthy();
    });

    it('should create the correct node -> application deployment hierarchy', () => {
        let deployment = new ApplicationDeployment(
            registry,
            UUID.randomUUID()
        );

        spyOn(deployment, 'load').and.callFake((node: Node) => {
            deployment.data = new ApplicationElement(node.data);
        });
        deployment.satisfy(context);
        expect(deployment.parent).toEqual(any(Node));
    });


    it('should create the correct layer hierarchy for a simple application hierarchy', () => {
        let deployment = new ApplicationDeployment(
            registry,
            UUID.randomUUID()
        );

        spyOn(deployment, 'load').and.callFake((node: Node) => {
            deployment.data = new ApplicationElement(node.data);
        });
        deployment.satisfy(context);
        expect(deployment.data).toEqual(any(ApplicationElement));
        expect(deployment.parent).toBeTruthy();
        expect(deployment.parent.data).toEqual(any(InfrastructureElement));
        expect(deployment.parent.parent).toEqual(any(VPC));
        expect(deployment.parent.parent.data).toEqual(any(VirtualCloud));
    });


    it('should create the correct layer hierarchy for an empty layer', () => {
        spyOn(graph, 'getDefaultParent').and.returnValue(new Layer());
        spyOn(graph, 'getSelectionCells').and.returnValue([]);
        let result = layerService.create('frap', 'adap', context);
        expect(result).toBeTruthy();
        expect(result.name).toBe('frap');
        expect(result.description).toBe('adap');
        expect(result.children).toEqual([]);
    });

});
