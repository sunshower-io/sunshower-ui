
import {MenuItem} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";
export class Maximize implements MenuItem {
    style: string = 'maximize icon';
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}