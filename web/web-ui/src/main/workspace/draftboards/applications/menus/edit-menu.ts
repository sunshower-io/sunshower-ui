import {MenuItem, AbstractMenuItem} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";
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