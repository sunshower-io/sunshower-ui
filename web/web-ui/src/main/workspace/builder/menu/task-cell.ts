import {
    mxCell,
    mxGraph,
    mxVertex,
    mxUtils,
    Layer,
    mxCellStyle,
    mxEvent,
    mxStylesheet
} from "mxgraph";


export interface MenuHandler {
    before(): void;
    after(): void;
}

export function node(name: string): mxCell {
    let document = mxUtils.createXmlDocument(),
        node = document.createElement(name);
    return node;
}


export class MenuItems {
    constructor(private styles: mxStylesheet) {
    }

    static create(styles: mxStylesheet): MenuItems {
        return new MenuItems(styles);
    }

    register(item: MenuItem): MenuItems {
        this.styles.putCellStyle(item.type, item.style);
        return this;
    }

}


type Listener = (sender: any, event: any)  => void;

export class MenuItem {
    type: string;
    event: string;
    icon: string;
    style: mxCellStyle;
    cell: mxCell;
    host: mxGraph;
    listener: Listener;

    public isTarget(event: mxEvent): boolean {
        return event.getProperty('cell') == this.cell;
    }
}

export class ApplicationMenuItem extends MenuItem {
    icon = '\uf1c9';
    event = mxEvent.CLICK;


    constructor(private handler: MenuHandler,
                private parent: Layer) {
        super();
    }

    listener = (sender: any, event: mxEvent): void => {
        if (this.isTarget(event)) {
            this.handler.before();
            this.parent.setVisible(true);
            this.host.refresh(this.parent);
        }
    }
}

export class InfrastructureMenuItem extends MenuItem {
    icon = '\uf233';
    event = mxEvent.CLICK;

    constructor(private handler: MenuHandler,
                private parent: Layer) {
        super();
    }

    listener = (sender: any, event: mxEvent): void => {
        if (this.isTarget(event)) {
            this.handler.before();
            this.parent.setVisible(true);
            this.host.refresh(this.parent);
        }
    }
}

export class EditMenuItem extends MenuItem {

    icon = '\uf044';
    event = mxEvent.CLICK;

    constructor(private handler: MenuHandler,
                private parent: Layer) {
        super();
    }

    listener = (sender: any, event: mxEvent): void => {
        if (this.isTarget(event)) {
            this.handler.before();
            this.parent.setVisible(true);
            this.host.refresh(this.parent);
        }
    }

}


export class CloseMenuItem extends MenuItem {
    icon = '\uf00d';
    event = mxEvent.CLICK;


    listener = (sender: any, event: mxEvent): void => {
        if (this.isTarget(event)) {
            this.host.removeCells([this.cell.getParent()]);
            event.consume();
        }
    }
}

export class TaskMenu {

    count = 0;

    constructor(private graph: mxGraph,
                private parent: mxVertex) {
    }


    public add(item: MenuItem): void {
        let vertex = node('a');


        vertex.setAttribute('label', item.icon);
        vertex.setAttribute('constituent', '1');

        // if(!this.graph.hasListener(item.event, item.listener)) {
        this.graph.addListener(item.event, item.listener);
        // }
        let result = this.graph.insertVertex(
            this.parent, null,
            vertex, 24 * this.count, 0, 24, 24,
            'constituent=1;fontFamily=FontAwesome;fontColor=#6b6b6b;fillOpacity=0'
        );
        item.cell = result;
        item.host = this.graph;
        result.setConnectable(false);
        this.count++;
    }
}
