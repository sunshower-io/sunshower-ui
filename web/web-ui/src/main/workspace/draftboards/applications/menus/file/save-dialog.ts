import {
    Draftboard,
    DraftboardManager
}  from 'elements/draftboard';

import {inject} from 'aurelia-framework';

@inject(DraftboardManager)
export class SaveDialog {

    private current:Draftboard;

    constructor(
        private draftboardManager:DraftboardManager
    ) {
        this.current = draftboardManager
            .focusedDraftboard();


    }


    save() : void {
        this.draftboardManager.save();
    }

}
