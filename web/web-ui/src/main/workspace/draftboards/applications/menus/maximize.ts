
import {MenuItem, AbstractMenuItem} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";
export class Maximize extends AbstractMenuItem implements MenuItem {
    style: string = 'maximize icon';
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}