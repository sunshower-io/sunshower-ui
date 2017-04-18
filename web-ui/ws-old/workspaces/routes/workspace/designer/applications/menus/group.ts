import {MenuItem} from 'common/lib/widget';
import {EditorContext} from "apps/workspaces/routes/workspace/designer/editor";

export class Group implements MenuItem {
    style: string ;
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}

export class Ungroup implements MenuItem {
    style: string = 'zoom out icon';
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}