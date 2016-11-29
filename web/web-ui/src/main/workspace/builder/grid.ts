import {
    mxGraph,
    mxPoint,
    mxGraphView,
    mxEvent
} from "mxgraph";

export class Grid {
    private canvas: HTMLCanvasElement;

    constructor(private graph: mxGraph) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0px';
        this.canvas.style.left = '0px';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.height = '100%';
        graph.container.appendChild(this.canvas);
    }

    public draw(): void {
        let scale = 0,
            gridSize = 0,
            width = 0,
            height = 0,
            translate = new mxPoint(),
            context = this.canvas.getContext('2d'),
            canvas = this.canvas,
            isContainerEvent = mxGraphView.prototype.isContainerEvent;




        mxGraphView.prototype.isContainerEvent = function(e:Event) {
            return isContainerEvent.apply(this, arguments) ||
                mxEvent.getSource(e) == canvas;
        };
        this.paintGrid(translate, scale, width, height, gridSize, context);
    }

    private paintGrid(translate: mxPoint,
                      scale: number,
                      currentWidth: number,
                      currentHeight: number,
                      gridSize: number,
                      context: CanvasRenderingContext2D): void {

        let graph = this.graph,
            bounds = graph.getGraphBounds(),
            width = Math.max(bounds.x + bounds.width, graph.container.clientWidth),
            height = Math.max(bounds.y + bounds.height, graph.container.clientHeight),
            sizeChanged = width != currentWidth || height != currentHeight;

        if (
            graph.view.scale != scale ||
            graph.view.translate.x != translate.x ||
            graph.view.translate.y != translate.y ||
            graph.gridSize != gridSize || sizeChanged
        ) {

            scale = graph.view.scale;
            translate = graph.view.translate.clone();
            gridSize = graph.gridSize;
            currentWidth = width;
            currentHeight = height;

            if (!sizeChanged) {
                context.clearRect(0, 0, width, height);
            } else {
                this.canvas.setAttribute('width', "" + width);
                this.canvas.setAttribute('height', "" + height);
            }

            let translateX = translate.x,
                translateY = translate.y,
                minStep = graph.gridSize,
                stepping = minStep * scale;

            if (stepping < minStep) {
                let count = Math.round(Math.ceil(minStep / stepping) / 2) * 2;
                stepping = count * stepping;
            }


            let xs = Math.floor((0 - translateX) / stepping) * stepping + translateX,
                xe = Math.ceil(width / stepping) * stepping,
                ys = Math.floor((0 - translateY) / stepping) * stepping + translateY,
                ye = Math.ceil(height / stepping) * stepping;

            xe += Math.ceil(stepping);
            ye += Math.ceil(stepping);

            let ixs = Math.round(xs),
                ixe = Math.round(xe),
                iys = Math.round(ys),
                iye = Math.round(ye);


            context.strokeStyle = '#767c89';

            context.setLineDash([2, 5]);
            context.beginPath();

            for (var x = xs; x <= xe; x += stepping) {
                x = Math.round((x - translateX) / stepping) * stepping + translateX;
                var ix = Math.round(x);

                context.moveTo(ix + 0.5, iys + 0.5);
                context.lineTo(ix + 0.5, iye + 0.5);
            }

            for (var y = ys; y <= ye; y += stepping) {
                y = Math.round((y - translateY) / stepping) * stepping + translateY;
                var iy = Math.round(y);

                context.moveTo(ixs + 0.5, iy + 0.5);
                context.lineTo(ixe + 0.5, iy + 0.5);
            }

            context.closePath();
            context.stroke();
        }

    }
}