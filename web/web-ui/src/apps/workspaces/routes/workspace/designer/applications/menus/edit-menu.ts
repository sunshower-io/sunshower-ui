import {AbstractMenuItem, MenuItem} from 'common/lib/widget';
import {EditorContext} from "apps/workspaces/routes/workspace/designer/editor";
import DeleteCells from "./delete-cells";

export default class EditMenu extends AbstractMenuItem implements MenuItem {
    style: string = 'write';
    name: string = 'Edit';
    menus: MenuItem[];

    constructor() {
        super();
        this.addMenu(new DeleteCells());
    }

    apply(editor: EditorContext): void {

    }

}