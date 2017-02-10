import {
    Draftboard,
    DraftboardManager
}  from 'apps/workspaces/services/draftboard';

import {inject} from 'aurelia-framework';

import 'canvg/rgbcolor';
import 'canvg/StackBlur';
import {ImageExporter} from "common/lib/utils/diagram/image-export";

@inject(DraftboardManager)
export class SaveDialog {

    private image: HTMLCanvasElement;
    private current: Draftboard;

    constructor(private draftboardManager: DraftboardManager) {
        this.current = draftboardManager
            .focusedDraftboard();
    }

    activate(): void {
        setTimeout(() => {
            let exportResult = new ImageExporter(this.current.builder).render(),
                bounds = this.current.builder.getHostContainerBounds(),
                i = exportResult.element,
                scaleWidth = 300 / bounds.width,
                scaleHeight = 200 / bounds.height,
                scaleFactor = Math.min(scaleWidth, scaleHeight) * 1.2,
                context = this.image.getContext('2d') as any;
            context.scale(scaleFactor, scaleFactor);
            // context.drawImage(i.outerHTML, 300 * scaleFactor, 200 * scaleFactor);
        });
    }


    save(): void {
        this.draftboardManager.save();
    }

}
