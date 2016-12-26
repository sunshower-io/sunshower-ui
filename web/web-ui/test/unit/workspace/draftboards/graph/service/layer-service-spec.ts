import {} from 'jasmine';
import createSpyObj = jasmine.createSpyObj;
import {mxGraph} from "mxgraph";
import 'aurelia-polyfills';
import {Container} from "aurelia-framework";
import {LayerService} from 'main/workspace/draftboards/graph/service/layer-service';


class navAware {
    toggleLeft() : boolean {
        return false;
    }

    toggleRight() : boolean {
        return false;
    }
}

describe('a layer service', () => {
    let layerService:LayerService = null;
    beforeEach(() => {
        let container = new Container();
        layerService = container.get(LayerService);
    }) ;

    it('should inject the layer service correctly', () => {
        expect(layerService).toBeTruthy();
    });

    it('should create the correct layer hierarchy for a simple application deployment', () => {
        let graph = createSpyObj('mxGraph', ['create']) as any,
            context = {
                host: new navAware(),
                graph:graph as mxGraph,
                offset: {top:0, left:0},
                location: {x: 0, y:0}
            };
        layerService.create('frap', 'adap', context);
    });

});
