import {MenuItem} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";

export class ZoomIn implements MenuItem {
    style: string = 'zoom icon';
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}

export class ZoomOut implements MenuItem {
    style: string = 'zoom out icon';
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }
}