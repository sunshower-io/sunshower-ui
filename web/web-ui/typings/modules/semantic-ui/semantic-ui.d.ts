

interface DropdownOptions {

    useLabels:boolean

    maxSelections:number

}




interface JQuery {
    dropdown(options?:DropdownOptions) :void;
    menu() : void;
}

interface JQueryStatic {
    dropdown:any;
}


