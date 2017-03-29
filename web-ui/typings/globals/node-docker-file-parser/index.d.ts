
declare interface ParserOptions {

}

declare class Parser {

    parse(text:any, options:ParserOptions) : any;

}

declare module 'node-docker-file-parser' {

    export = parser;

}

declare let parser:Parser;