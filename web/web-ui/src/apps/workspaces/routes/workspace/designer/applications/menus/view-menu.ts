import {AbstractMenuItem, MenuItem} from 'common/elements/menu';
import {EditorContext} from "main/designer/draftboards/editor";
export default class ViewMenu extends AbstractMenuItem implements MenuItem {
    style: string = 'block layout icon';
    name: string = 'view';
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}