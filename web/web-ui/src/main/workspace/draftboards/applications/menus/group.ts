import {MenuItem} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";

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