
import {AbstractMenuItem, MenuItem} from 'common/lib/widget';
import {EditorContext} from "apps/workspaces/routes/workspace/designer/editor";
export class Maximize extends AbstractMenuItem implements MenuItem {
    style: string = 'maximize icon';
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}