
import {Sidebar} from "../sidebar";
export class RightSidebar extends Sidebar {


    constructor() {
        super();

        this.configure([{
            name: 'palette',
            icon: 'large grey file outline icon',
            active:true,
        },{
            name: 'properties',
            icon: 'large grey folder outline icon'
        }]);
        this.active = this.components[0];
    }


}