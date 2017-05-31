declare module 'mxgraph' {

    export class mxCodec {

        encode(model: mxGraphModel) : any;

    }

    export module mxCodecRegistry {
        function registerCodec(codec:mxObjectCodec);
    }

    export class mxObjectCodec {
        constructor(data:any);

    }
}