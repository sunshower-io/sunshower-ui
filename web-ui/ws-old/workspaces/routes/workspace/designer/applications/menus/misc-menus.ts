
import {AbstractMenuItem} from 'common/lib/widget';
import {EditorContext} from "apps/workspaces/routes/workspace/designer/editor";

export class ToggleLeft extends AbstractMenuItem {
    align = 'right';

    pad : false;
    image = 'styles/themes/hasli/assets/images/icons/toggle-left-menu-icon.svg';

    apply(editor: EditorContext): void {
        editor.host.toggleLeft();
    }
}

export class ToggleRight extends AbstractMenuItem {
    align = 'right';
    pad : false;
    image = 'styles/themes/hasli/assets/images/icons/toggle-right-menu-icon.svg';

    apply(editor: EditorContext): void {
        editor.host.toggleRight();
    }
}

export class SearchMenu extends AbstractMenuItem {
    align = 'right';
    name = 'Browse Templates';
    style = 'search icon';
    pad : true;

}
