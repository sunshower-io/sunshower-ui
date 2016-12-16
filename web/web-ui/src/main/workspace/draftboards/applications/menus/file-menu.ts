import {
    MenuItem,
    AbstractMenuItem
} from 'common/elements/menu';
import {EditorContext} from "main/workspace/draftboards/editor";
export default class FileMenu extends AbstractMenuItem implements MenuItem {
    style: string = 'code icon';
    name: string = 'File';
    menus: MenuItem[] = [{
        style: 'whatever',
        name: 'submenu',
        align: 'left',
        menus:null,
        apply:null,
    }];

}