import {
    bindable,
    observable,
    customElement,
    containerless,
    inject,
    TaskQueue
} from "aurelia-framework";
import {
    MenuItem,
    OperationContextFactory
} from './components';

export * from './components';

@containerless
@inject(TaskQueue)
@customElement('menu')
export class Menu {

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

