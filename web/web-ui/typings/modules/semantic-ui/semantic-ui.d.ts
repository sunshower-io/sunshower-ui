

interface DropdownOptions {

    useLabels:boolean

    maxSelections:number

}




interface JQuery {
    menu() : void;
    dropdown(options?:DropdownOptions) :void;
    dropdown(fname:string, ...options:any[]);
}

interface JQueryStatic {
    dropdown:any;
}


