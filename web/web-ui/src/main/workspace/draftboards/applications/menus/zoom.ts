import {MenuItem, AbstractMenuItem} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";

export class ZoomIn extends AbstractMenuItem implements MenuItem {
    style: string = 'zoom icon';
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}

export class ZoomOut extends AbstractMenuItem implements MenuItem {

    style: string = 'zoom out icon';
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }
}