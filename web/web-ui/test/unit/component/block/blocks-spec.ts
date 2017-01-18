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
import {BlockManager} from 'component/blocks/block';


describe('a block manager', () => {

    let container:Container = null,
        blockManager: BlockManager = null;

    beforeEach(() => {
        container = new Container();
        blockManager = container.get(BlockManager);
    });

    it('should be injected correctly', () => {
        expect(blockManager).toBeTruthy();
    });

    it('should list element types correctly', () => {
        expect(blockManager.listTypes().length).toBe(2);
    });

    it('should list element type names', () => {
        console.log("Bl", blockManager.listTypes());
        expect(blockManager.listTypes()).toEqual([1, 0]);
    });


});
