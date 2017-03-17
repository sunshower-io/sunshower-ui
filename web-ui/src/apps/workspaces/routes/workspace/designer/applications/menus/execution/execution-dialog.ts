import * as _ from 'lodash'
import {inject} from 'aurelia-framework';
import {Element} from 'common/lib/canvas/element';

import {
    Sequence,
    ParallelSchedule
} from "common/lib/algorithms/graph";
import {
    Draftboard,
    DraftboardManager
} from "apps/workspaces/services/draftboard/draftboard";


@inject(DraftboardManager)
export class ExecutionDialog {

    label               :string;

    sequences           :Sequence<any>[];

    draftboard          : Draftboard;

    constructor(private draftboardManager:DraftboardManager) {


    }

    activate() : void {
        let draftboard = this.draftboardManager.focusedDraftboard(),
            schedule = new ParallelSchedule(),
            sequences = schedule.run(draftboard);
        this.draftboard = draftboard;
        this.sequences = sequences;
    }



    elements(sequence:Sequence<any>) : any {
        return _.values(sequence.elements);
    }

    get(id:string) : Element {
        return this.draftboard.nodes[id] as Element;
    }

}