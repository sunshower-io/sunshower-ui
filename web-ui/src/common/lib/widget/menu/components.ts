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
