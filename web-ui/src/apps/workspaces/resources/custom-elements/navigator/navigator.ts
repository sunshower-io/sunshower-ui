import 'materialize-css';
import {UUID} from "common/lib/utils/uuid";

export class Navigator {

    private controlId: string       =  UUID.random();

    private navigator               : HTMLElement;
    private navigatorControl        : HTMLElement;


    open() : void {

    }

    close() : void {

    }

    attached() : void {
        $(this.navigatorControl).sideNav();
    }

}