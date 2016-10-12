export class Hash {
    public static createId() : string {
        let s = [],
            ar = '1234567890abcdef';

        for(var i = 0; i < 20; ++i) {
            s.push(ar[Math.round(Math.random() * ar.length)]);
        }
        return s.join('');
    }
}