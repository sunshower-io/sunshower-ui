

interface DropdownOptions {

    useLabels:boolean

    maxSelections:number

}


interface JQuery {
    dropdown(options?:DropdownOptions) :void;
}

interface JQueryStatic {
    dropdown:any;
}


