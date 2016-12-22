import {AbstractMenuItem, MenuItem} from 'common/elements/menu';
import {EditorContext} from "../../editor";
export default class CreateLayerMenuItem
    extends AbstractMenuItem
    implements MenuItem {

    constructor() {
        super();
        this.name = 'Create Layer';
    }

    apply(editor: EditorContext): void {

    }


}