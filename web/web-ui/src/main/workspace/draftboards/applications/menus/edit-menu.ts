import {MenuItem, AbstractMenuItem} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";

export default class EditMenu extends AbstractMenuItem implements MenuItem {
    style: string = 'write';
    name: string = 'Edit';
    menus: MenuItem[];

    apply(editor: EditorContext): void {

    }

}