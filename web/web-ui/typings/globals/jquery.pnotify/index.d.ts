

declare class PNotifyOptions {
    css(style?:any);
}

declare class PNotify {

    constructor(options:any);

    static get() :PNotifyOptions;
}

declare module PNotify {
    export function PNotify();
}

declare module 'pnotify' {

    export = PNotify;

}

declare module 'pnotify.callbacks' {

}
