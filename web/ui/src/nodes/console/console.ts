import * as _ from 'lodash';
import 'josh/js/shell';
import 'josh/js/history';
import 'josh/js/readline';
import 'josh/js/killring';
import 'josh/js/input';


export class Console {
    
    
    attached() {
        console.log(_);
        let shell = Josh.Shell({

        })
        shell.activate();
    }
    
}