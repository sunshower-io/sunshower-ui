
declare module 'showdown' {

    export class Converter {


        makeHtml(text:string) : string;

        setFlavor(flavor: string) : void;
    }

}

