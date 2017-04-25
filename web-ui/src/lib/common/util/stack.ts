

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
        readonly next:StackNode<T>
    ) {

    }

}