
import {} from 'jasmine';


import {Stack} from 'lib/common/util/stack';


describe('a linked stack', () => {

    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });


    it('should throw an underflow error when no elements are present', () => {
        expect(() => {
            stack.pop();
        }).toThrowError('Stack underflow');
    });


    it('should push a number correctly', () => {
        stack.push(1);
    });

    it('should be empty initially', () => {
        expect(stack.isEmpty()).toBe(true);
    });

    it('should fill when an element is pushed', () => {
        expect(stack.isEmpty()).toBe(true);
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
        stack.pop();
        expect(stack.isEmpty()).toBe(true);

    });

    it('should pop the number it just pushed', () => {
        stack.push(1);
        let n = stack.pop();
        expect(n).toBe(1);
    });

    it('should replace the top of the stack correctly', () => {
        stack.push(1);
        stack.replace(1);
        expect(stack.pop()).toBe(1);
    });


    it('should replace the bottom of the stack correctly', () => {
        stack.push(1);
        stack.push(2);
        stack.replace(1);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(2);
    });


    it('should push and pop many numbers', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        stack.push(6);
        expect(stack.pop()).toBe(6);
        expect(stack.pop()).toBe(1);
        expect(() => {
            stack.pop()
        }).toThrowError("Stack underflow");
    });

});