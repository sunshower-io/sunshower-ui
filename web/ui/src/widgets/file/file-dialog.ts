import {autoinject} from "aurelia-dependency-injection";
import {customElement, bindable, bindingMode} from "aurelia-framework";
import {RemoteFileService} from "../../service/files/FileService";

@autoinject()
@customElement('file-dialog')
export class FileDialog {
    
    @bindable()
    public title:string;
    
    
    @bindable()
    public openButtonText:string;
    
    @bindable()
    public closeButtonText:string;

    private tree:Element;
   
    private dialog:Element;
    
    private fileService:RemoteFileService;
    
    
    constructor(private element:Element) {
        
    }
    
    openChanged(newValue:boolean, oldValue:boolean) {
        if(newValue) {
            this.showDialog();
        } else {
            this.hideDialog();
        }
    }
    
    public attached() : void {

        $(this.tree).jstree({
            'core': {
                'data': [{
                    "text": "configurations",
                    "children": [
                        {"text": "jboss.xml"},
                        {"text": "undertow.xml"}
                    ]
                }
                ]
            }
        });
        $(this.tree).off('dblclick').on('dblclick', (e) => {
            this.openFile();
        });
    }
    
    
    
    public showDialog():void {
        $(this.dialog).modal('show');
    }
    
    public hideDialog() : void {
        $(this.dialog).modal('hide');
    }

    
    private openFile() : void {
        this.hideDialog();
        let files = $(this.tree).jstree('get_selected', true);
        if(files && files.length > 0) {
            this.fire(files[0].text);
        }
    }
    
    
    private fire(fileName:string) {
        let event:CustomEvent;
        if(window.hasOwnProperty('CustomEvent')) {
            event = new CustomEvent('file-selected', {
                bubbles:true,
                detail: {
                    fileName: fileName
                }
            });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent('file-selected', true, true, {
                value: fileName
            });
        }
        this.element.dispatchEvent(event);
    }
}