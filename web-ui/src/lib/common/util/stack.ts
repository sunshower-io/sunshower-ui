

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
        let copy = new Stack<T>(),
            current = this.top;
        while(current) {
            if(current.data !== t) {
                copy.push(current.data);
            }
            current = current.next;
        }
        copy.reverse();
        copy.push(t);
        this.top = copy.top;
    }

    reverse() : void {
        let copy = new Stack<T>(),
            current = this.top;
        while(current) {
            copy.push(current.data);
            current = current.next;
        }
        this.top = copy.top;
    }

    toArray() : T[] {
        let r = [],
            current = this.top;
        while(current) {
            r = r.concat(current.data);
            current = current.next;
        }
        return r;
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