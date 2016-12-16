import {MenuItem} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";
export default class FileMenu implements MenuItem {
    style: string = 'code';
    name: string = 'File';
    menus: MenuItem[];

    apply(editor: EditorContext): void {
    }

}