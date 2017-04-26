

export class Stack<T> {

    private top : StackNode<T>;

    push(data: T) {
        this.top = new StackNode<T>(data, this.top);
    }

    peek() : T {
        if(this.top) {
            return this.top.data;
        }
        return undefined;
    }

    replace(t: T)  : void {
        // let u = this.top;
        // while(u) {
        //     let next = u && u.next ? u.next : null;
        //     if(u.data === t) {
        //         u.next.next = next;
        //     }
        //     u = u.next;
        // }
        this.push(t);
    }

    pop() : T {
        if(!this.top) {
            throw new Error("Stack underflow");
        } else {
            let t = this.top.data;
            this.top = this.top.next;
            return t;
        }
    }


    isEmpty() : boolean {
        return this.top == null || (typeof this.top == 'undefined');
    }
}

class StackNode<T> {

    constructor(
        readonly data: T,
        public next:StackNode<T>
    ) {

    }

}