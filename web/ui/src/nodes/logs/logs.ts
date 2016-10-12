import {Time} from '../../utils/Time';


export class Logs {

    private console:HTMLTextAreaElement;

    private running:boolean = false;
    
    deactivate() : void {
        this.running = false;
        
    }
    
    activate() : void {
        this.running = true;
    }
    
    attached():void {
        setTimeout( () => {
            Time.until((i:number) => {
                this.append(`64.242.88.10 - - [07/Mar/2004:16:05:49 -0800] "GET /twiki/bin/edit/Main/Double_bounce_sender?topicparent=Main.ConfigurationVariables HTTP/1.1" 401 12846`);

            }, (i) => {
                return this.running;
            }, 10)
        });
    }

    private append(text:string):void {
        if(this.running) {
            this.console.value += text + '\n';
            this.console.scrollTop = this.console.scrollHeight;
        }
    }

}