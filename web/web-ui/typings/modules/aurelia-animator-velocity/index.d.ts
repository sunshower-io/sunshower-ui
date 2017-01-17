declare module 'aurelia-animator-velocity' {
    export interface Animator {

    }
    export type Options = Map<string, any>;
    export class VelocityAnimator {

        static configureDefault(container:Element, instance:Animator);

        enter(element:Element) : Promise<any>;

        leave(element:Element) : Promise<any>;




        move(element:Element) : Promise<any>;

        animate(element:Element, className:string, options:Options);

    }
}