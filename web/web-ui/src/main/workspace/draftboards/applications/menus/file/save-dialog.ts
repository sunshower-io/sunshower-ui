import {
    Draftboard,
    DraftboardManager
}  from 'elements/draftboard';

import {inject} from 'aurelia-framework';

import 'canvg/rgbcolor';
import 'canvg/StackBlur';
import * as canvg from 'canvg/canvg';
import {
    ImageExporter,
    ExportResult
} from 'utils/diagram/image-export';

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
            let c = canvg as any;

            let exportResult = new ImageExporter(this.current.builder).render(),
                bounds = this.current.builder.getHostContainerBounds(),
                i = exportResult.element,
                scaleWidth = 300 / bounds.width,
                scaleHeight = 200 / bounds.height,
                scaleFactor = Math.min(scaleWidth, scaleHeight) * 1.2,
                context = this.image.getContext('2d') as any;
            context.scale(scaleFactor, scaleFactor);
            context.drawSvg(i.outerHTML, 300 * scaleFactor, 200 * scaleFactor);
        });
    }


    save(): void {
        this.draftboardManager.save();
    }

}
