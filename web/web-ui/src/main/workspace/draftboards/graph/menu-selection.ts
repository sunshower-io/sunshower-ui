import {mxRubberband, mxGraph} from 'mxgraph';

import {UUID} from 'utils/uuid';
export class MenuSelector extends mxRubberband {
    constructor(graph: mxGraph) {
        super(graph);

    }

    mouseUp(sender: any, me: any): any {
        let menu = document.getElementById('graph-context-menu');

        if(menu) {
            $(menu).remove();
        }
        let id = UUID.randomUUID().value,
            div = $(`<div class='graph-context-menu ui vertical menu' id="graph-context-menu">
                <a class="item">Create Layer</a>
                <a class="item">Select Layer</a>
        `);

        div.offset({top: this.currentY + 100, left: this.currentX - 80});

        $('body').append(div);
        div.focus();
        $(document).on('blur', `#graph-context-menu`, () => {
            alert("DONE");
        });
        return super.mouseUp(sender, me);
    }

}