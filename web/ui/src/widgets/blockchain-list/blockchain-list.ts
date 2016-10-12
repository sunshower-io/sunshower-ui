import {Block} from "../../service/blockchain/BlockchainService";
import {bindable} from "aurelia-framework";
import * as $ from 'jquery';
import 'datatables';
export class BlockchainList {
    
    @bindable()
    private visible:boolean = true;
    
    @bindable
    private blocks:Array<Block>;
    private blockTable:Element;
    
    constructor() {
        
    }
    
    
    
    getBlockData() : Array<Array<any>> {
        return this.blocks.map(block => {
            let revision = block.revision;
            return [
                revision.id, 
                revision.date,
                revision.author,
                revision.message,
                block.type,
                
            ]
        });
        
    }
    attached() {
        $(this.blockTable).DataTable({
            data: this.getBlockData(),
            columns: [
                {"title": "Block ID"},
                {"title": "Date"},
                {"title": "Author"},
                {"title": "Message"},
                {"title": "Type"},
                {"title":"Participants"}
            ],
            columnDefs: this.createColumnDefs(),
            "dom": '<"search-filter"f>tip',
            oLanguage: {
                oPaginate: {
                    sNext: '',
                    sPrevious: ''
                },
                sSearch: '',
            },
            destroy: true
        });
    }



    private createColumnDefs() : Array<{}> {
        return [{
            "targets": -1,
            "data": null,
            "defaultContent": `
                    <div class="btn-group table-inline-editor" role="group">
                        <button class='ion-android-open btn btn-lg open-revision'></button>
                        <button class='ion-cube btn btn-lg show-block'></button>
                    </div>
                    `
        }];
    }
}
