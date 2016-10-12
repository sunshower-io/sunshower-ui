
import {
    bindable,
    customElement,
    autoinject
} from "aurelia-framework";
import {HistoryView} from "./history-view";

@autoinject()
@customElement('history-dialog')
export class HistoryDialog {
    
    
    
  
    tableStyle:Object = {
        border:'1px solid red',
        width:'100%',
        height:'400px'
    };
    
    @bindable()
    public title:string;
    
    private dialog:Element;

    @bindable()
    public openButtonText:string;

    @bindable()
    public closeButtonText:string;
    
    private historyView:HistoryView;


    constructor(private element:Element) {

    }

    public attached() : void {
        
    }

    public showDialog():void {
        this.historyView.reload();
        $(this.dialog).modal('show');
        
    }

    public hideDialog() : void {
        $(this.dialog).modal('hide');
    }


}