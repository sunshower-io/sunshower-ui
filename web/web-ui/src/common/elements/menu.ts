import {
    bindable,
    observable,
    customElement,
    containerless,
    inject,
    TaskQueue
} from "aurelia-framework";


@containerless
@inject(TaskQueue)
@customElement('menu')
export default class Menu {

    element: HTMLElement;

    @bindable
    dropdown: boolean = true;

    @bindable
    style: string;

    @bindable
    classes: string;

    @bindable
    @observable
    items: MenuItem[];

    @bindable
    contextFactory: OperationContextFactory;

    constructor(private taskQueue:TaskQueue)  {

    }


    itemsChanged(oldValue: MenuItem[],
                 newValue: MenuItem[]): void {
        let element = this.element;
        this.taskQueue.queueMicroTask(() => {
            $(element).find('.dropdown').dropdown({
                action: 'hide'
            });
        });
    }


    setItems(items: MenuItem[]) {
        this.items = items;
    }
}

export interface OperationContext {

}

export interface OperationContextFactory {
    create() :OperationContext;
}

export interface MenuItem {
    style       ?: string;
    name        ?: string;
    align       ?: string;
    menus       ?: MenuItem[];
    apply(editor: OperationContext): void;
}

export abstract class AbstractMenuItem implements MenuItem {
    align: string = 'left';
    name : string;
    menus       ?: MenuItem[];
    apply(editor:OperationContext) : void {
    }

    addMenu(menu:MenuItem) {
        if(!this.menus) {
            this.menus = [];
        }
        this.menus.push(menu);
    }
}