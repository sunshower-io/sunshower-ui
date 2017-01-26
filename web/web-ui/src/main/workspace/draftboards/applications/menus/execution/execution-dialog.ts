import * as _ from 'loadash'
import {inject} from 'aurelia-framework';
import {Element} from 'canvas/element/element';
import {
    Sequence,
    ParallelSchedule
} from "algorithms/graph/scheduling";
import {DraftboardManager, Draftboard} from 'component/draftboard/draftboard';


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