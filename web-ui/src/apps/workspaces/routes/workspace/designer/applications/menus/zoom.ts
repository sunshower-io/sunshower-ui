import {MenuItem, AbstractMenuItem} from 'common/lib/widget';
import {EditorContext} from "apps/workspaces/routes/workspace/designer/editor";

export class ZoomIn extends AbstractMenuItem implements MenuItem {
    style: string = 'zoom icon';
    name: string;
    menus: MenuItem[];
    apply(editor: EditorContext): void {
        editor.graph.zoomIn();
    }
}

export class ZoomOut extends AbstractMenuItem implements MenuItem {

    style: string = 'zoom out icon';
    name: string;
    menus: MenuItem[];

    apply(editor: EditorContext): void {
        editor.graph.zoomOut();
    }
}