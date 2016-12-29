import {
    Canvas,
    EditorContext
} from "./canvas";

import {
    mxRubberband,
    mxGraph
} from 'mxgraph';


import {MenuItem} from 'common/elements/menu';


export class MenuSelector extends mxRubberband {

    static readonly down: number = 1;
    static readonly moved: number = 2;
    static readonly dragged: number = 3;


    private readonly menus: MenuItem[];


    id: string = 'graph-context-menu';
    /**
     *
     */
    state: number;

    host: Canvas;

    constructor(graph: Canvas) {
        super(graph);
        this.menus = [];
        this.host = graph;
    }

    addMenu(menu: MenuItem): void {
        this.menus.push(menu);
    }

    mouseDown(sender: any, me: any): void {
        $('#' + this.id).remove();
        this.state = MenuSelector.down;
        super.mouseDown(sender, me);
    }

    mouseMove(sender: any, me: any) {
        this.state = this.state | MenuSelector.moved;
        return super.mouseMove(sender, me);
    }


    mouseUp(sender: any, me: any): any {
        if (this.state === MenuSelector.dragged) {
            this.showMenu();
        }
        this.state = 0;
        return super.mouseUp(sender, me);
    }

    private showMenu(): void {
        let
            id = this.id,
            menu = $(`<div class="graph-context-menu ui vertical menu" id="${id}"/>`);
        for (let menuItem of this.menus) {
            menu.append(this.createMenu(menuItem, menu));
        }
        menu.offset({
            top: this.currentY + 100,
            left: this.currentX - 80
        });
        $('body').append(menu);
    }

    createMenu(item: MenuItem, parent: JQuery): JQuery {
        let element = $(`<a class="item"">${item.name}</a>`);
        element.click(this.newDelegate(item, parent));
        return element;
    }


    newDelegate(item:MenuItem , parent: JQuery) : (Event) => void {
        return (e: Event) : void => {
            item.apply(this.editorContext());
            parent.remove();
        }
    };

    editorContext(): EditorContext {
        return {
            graph: this.host,
            host: undefined,
            location: {
                x: this.currentX,
                y: this.currentY
            }
        }
    }


}

