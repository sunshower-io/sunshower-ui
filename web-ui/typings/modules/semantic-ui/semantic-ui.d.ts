

interface DropdownOptions {

    useLabels:boolean

    maxSelections:number

}




interface JQuery {
    menu() : void;
    dropdown(options?:DropdownOptions) :void;
    dropdown(fname:string, ...options:any[]);
    progress(fname:string, arg1?:any, arg2?:any);
}

interface JQueryStatic {
    dropdown:any;
}


