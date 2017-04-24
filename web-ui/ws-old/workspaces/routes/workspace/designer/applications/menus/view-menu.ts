import {AbstractMenuItem, MenuItem} from 'common/lib/widget';
import {EditorContext} from "apps/workspaces/routes/workspace/designer/editor";
export default class ViewMenu extends AbstractMenuItem implements MenuItem {
    style: string = 'block layout icon';
    name: string = 'view';
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}