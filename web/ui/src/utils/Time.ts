
export namespace Time {
    
    
    export function loop(f : (i:number) => void, start:number = 0, end:number, delay:number)  {
        setTimeout(() => {
            if(start < end) {
                f(start);
                loop(f, start+1, end, delay);
            }
        }, delay);
    }


    export function until(f:(i:number) => void, predicate:(i:number) => boolean, delay:number) {
        loopWhile(f, predicate, delay, 0);
    }
    
    export function loopWhile(f:(i:number) => void, predicate:(i:number) => boolean, delay:number, i:number) {
        setTimeout(() => {
            if(predicate(i)) {
                f(i)
                loopWhile(f, predicate, delay, i + 1);
            } 
        }, delay);
    }
    
}