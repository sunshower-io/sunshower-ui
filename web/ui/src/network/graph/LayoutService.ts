export class LayoutService {

    private layouts:Map<string, Object>;

    constructor() {
        this.layouts = new Map<string, Object>();
        this.createDefaults();
    }

    getLayout(key:string):Object {
        return this.layouts[key];
    }

    register(key:string, layout:Object):void {
        this.layouts[key] = layout;
    }

    private createDefaults():void {
        this.createCircle();
        this.createCose();
        this.createGrid();
        this.createRandom();
        this.createPreset();
        this.createConcentric();
        this.createBreadthFirst();

    }
    
    private createPreset() : void {

        var options = {
            name: 'preset',

            positions: undefined, 
            zoom: undefined, 
            pan: undefined, 
            fit: true, 
            padding: 30, 
            animate: false, 
            animationDuration: 500,
            animationEasing: undefined, 
            ready: undefined, 
            stop: undefined 
        };
        this.register('preset', options);
    }
    
    private createConcentric() : void {
        var options = {
            name: 'concentric',
            fit: true,
            padding: 30,
            startAngle: 3 / 2 * Math.PI,
            sweep: undefined,
            clockwise: true,
            equidistant: false,
            minNodeSpacing: 10,
            boundingBox: undefined,
            avoidOverlap: true,
            height: undefined,
            width: undefined,
            concentric: function (node) {
                return node.degree();
            },
            levelWidth: function (nodes) {
                return nodes.maxDegree() / 4;
            },
            animate: false,
            animationDuration: 500,
            animationEasing: undefined,
            ready: undefined,
            stop: undefined
        };
        this.register('concentric', options);
    }
    
    private createRandom() : void {
        var options = {
            name: 'random',
            fit: true,
            padding: 30,
            boundingBox: undefined,
            animate: false,
            animationDuration: 500,
            animationEasing: undefined,
            ready: undefined,
            stop: undefined
        };
        this.register('rand', options);
    }
    
    private createGrid() : void {

        var options = {
            name: 'grid',

            fit: true,
            padding: 30,
            boundingBox: undefined,
            avoidOverlap: true,
            avoidOverlapPadding: 10,
            condense: false,
            rows: undefined,
            cols: undefined,
            position: function (node) {
            },
            sort: undefined,
            animate: false,
            animationDuration: 500,
            animationEasing: undefined,
            ready: undefined,
            stop: undefined
        };
        this.register('grid', options);
    }
    
    private createBreadthFirst() : void {
        var options = {
            name: 'breadthfirst',

            fit: true,
            directed: false,
            padding: 30,
            circle: false,
            spacingFactor: 1.75,
            boundingBox: undefined,
            avoidOverlap: true,
            roots: undefined,
            maximalAdjustments: 0,
            animate: false,
            animationDuration: 500,
            animationEasing: undefined,
            ready: undefined,
            stop: undefined
        };
        this.register('breadthfirst', options);
    }


    private createCose():void {
        var options = {
            name: 'cose',
            ready: function () {
            },

            stop: function () {
            },
            animate: true,
            animationThreshold: 250,
            refresh: 20,
            fit: true,
            padding: 30,
            boundingBox: undefined,
            componentSpacing: 100,
            nodeRepulsion: function (node) {
                return 400000;
            },
            nodeOverlap: 10,
            idealEdgeLength: function (edge) {
                return 10;
            },
            edgeElasticity: function (edge) {
                return 100;
            },
            nestingFactor: 5,
            gravity: 80,
            numIter: 1000,
            initialTemp: 200,
            coolingFactor: 0.95,
            minTemp: 1.0,
            useMultitasking: true
        };
        this.register('cose', options);
    }

    private createCircle():void {
        var options = {
            name: 'circle',
            fit: true,
            padding: 30,
            boundingBox: undefined,
            avoidOverlap: true,
            radius: undefined,
            startAngle: 3 / 2 * Math.PI,
            sweep: undefined,
            clockwise: true,
            sort: undefined,
            animate: false,
            animationDuration: 500,
            animationEasing: undefined,
            ready: undefined,
            stop: undefined
        };
        this.register('circle', options);
    }


}