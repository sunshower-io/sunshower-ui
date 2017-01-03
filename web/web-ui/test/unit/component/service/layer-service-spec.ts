import {} from 'jasmine';
import any = jasmine.any;
import 'aurelia-polyfills';
import {Container} from "aurelia-framework";
import {Registry} from "utils/registry";
import {EditorContext, Canvas} from "canvas/core/canvas";
import {DialogService} from "aurelia-dialog";
import {initialize} from 'aurelia-pal-browser';

import {VirtualCloud} from "component/model/cloud";
import {ApplicationDeployment} from "component/model/deployment";
import {InfrastructureNode} from "component/model/infrastructure-node";

import {LayerService} from 'component/service/layer-service';

import {
    DraftboardManager,
    Draftboard
} from "component/draftboard/draftboard";
import {LayerElement} from "component/model/layer";


describe('an application deployment', () => {

    initialize();

    let canvas: Canvas= null,
        registry: Registry,
        container: Container,
        context: EditorContext = null,
        draftboardManager: DraftboardManager,
        layerService : LayerService,
        containerElement : HTMLElement;



    beforeEach(() => {
        containerElement = document.createElement('div');
        container = new Container();
        draftboardManager = container.get(DraftboardManager);
        canvas = new Canvas(containerElement, container.get(DialogService));
        layerService = container.get(LayerService);
        registry = container.get(Registry);

        context = {
            host: null,
            graph: canvas,
            offset: {top: 0, left: 0},
            location: {x: 0, y: 0}
        };

        draftboardManager.setFocusedDraftboard(new Draftboard(canvas));
    });

    it('should resolve the parent of the node if a grand parent exists but is not selected', () => {

        let fst = new InfrastructureNode(),
            snd = new InfrastructureNode(),
            third = new InfrastructureNode();

        fst.addPredecessor(snd);
        snd.addSuccessor(fst);

        third.addSuccessor(snd);
        snd.addPredecessor(third);


        let roots = layerService.resolveRoots([fst, snd]);

        expect(roots.length).toBe(1);
        expect(roots[0]).toBe(snd);
    })

    it('should resolve the grandparent of a node if the node and all its intermediate ancestors are selected', () =>{
        let fst = new InfrastructureNode(),
            snd = new InfrastructureNode(),
            third = new InfrastructureNode();

        fst.addPredecessor(snd);
        snd.addSuccessor(fst);

        third.addSuccessor(snd);
        snd.addPredecessor(third);


        let roots = layerService.resolveRoots([fst, third, snd]);

        expect(roots.length).toBe(1);
        expect(roots[0]).toBe(third);
    });

    it('should resolve the parent of an application deployment if both are selected--reversed', () => {
        let deployment = new ApplicationDeployment(registry, ''),
            parent = new InfrastructureNode();

        parent.addSuccessor(deployment);
        deployment.addPredecessor(parent);

        let roots = layerService.resolveRoots([parent, deployment]);
        expect(roots.length).toBe(1);
        expect(roots[0]).toBe(parent);
    });


    it('should resolve the parent of an application deployment if both are selected', () => {
        let deployment = new ApplicationDeployment(registry, ''),
            parent = new InfrastructureNode();

        parent.addSuccessor(deployment);
        deployment.addPredecessor(parent);

        let roots = layerService.resolveRoots([deployment, parent]);
        expect(roots.length).toBe(1);
        expect(roots[0]).toBe(parent);
    });

    it('should insert a layer with the correct name at the correct location via create()', () => {
        // let deployment = new ApplicationDeployment(registry, '');
        // deployment.satisfy(context);
        // spyOn(canvas, 'getSelectionCells').and.callFake(() => {
        //     return [
        //         deployment
        //     ];
        // });
        // let element = layerService.create('Pre-production', 'the preprod layer', context);
        // expect(element.getSuccessors().length).toBe(1);
        // expect(element.getPredecessors().length).toBe(0);


        // let [root, level] = layerService.resolveRootAndLevel(deployment, 0);
        // expect(level).toBe(3);
        // expect(root).toEqual(any(LayerElement));
        //
        // let successors = root.getSuccessors();
        // expect(successors.length).toBe(1);
        // let vc = successors[0];
        // expect(vc).toBeTruthy();
        // expect(vc).toEqual(any(VirtualCloud));
        //
        // successors = vc.getSuccessors();
        // expect(successors.length).toBe(1);
        //
        // let inode = successors[0];
        // expect(inode).toBeTruthy();
        // expect(inode).toEqual(any(InfrastructureNode));
        //
        // successors = inode.getSuccessors();
        //
        // expect(successors.length).toBe(1);
        // let d = successors[0];
        // expect(d).toBe(deployment);
    });

    it('should resolve the VPC as the top-level selected element by default', () => {
        // let deployment = new ApplicationDeployment(registry, '');
        // deployment.satisfy(context);
        //
        // let [root, level] = layerService.resolveRoots([
        //     deployment,
        //     deployment.getPredecessors()[0],
        //     deployment.getPredecessors()[0].getPredecessors()[0]
        // ]);
        //
        // expect(level).toBe(2);
        // expect(root).toEqual(any(VirtualCloud));
    });


    it('should be injected', () => {
        expect(layerService).toBeTruthy();
    });






});