import {} from 'jasmine';
import {Cloneable} from 'lib/common/lang';

import {Stack} from 'lib/common/util/stack';
import {
    Command,
    CommandManager
} from 'lib/common/edit/command/command';




describe('a command manager', () => {

    let manager : CommandManager,
        stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
        manager = new CommandManager();
    });

    it('should initially be un-undoable', () => {

        expect(manager.canUndo()).toBe(false);
    });

    it('should initially be un-redoable', () => {
        expect(manager.canRedo()).toBe(false);

    });

    it('should add an integer', () => {
        manager.execute(new AddIntegerCommand(1, stack));
        expect(stack.peek()).toBe(1);
        expect(manager.canUndo()).toBe(true);
    });

    it('should undo adding an integer', () => {
        manager.execute(new AddIntegerCommand(1, stack));
        expect(manager.canRedo()).toBe(false);
        expect(stack.peek()).toBe(1);
        manager.undo();
        expect(stack.peek()).toBeUndefined();
        expect(manager.canUndo()).toBe(false);
        expect(manager.canRedo()).toBe(true);

        manager.redo();
        expect(stack.peek()).toBe(1);
        manager.undo();
        expect(stack.peek()).toBeUndefined();

    });

});


export class AddIntegerCommand implements Command {
    constructor(private n: number, private stack:Stack<number>) {
    }


    redo(): void {
        this.stack.push(this.n);
    }

    undo(): void {
        this.stack.pop();
    }

    execute() : void {
        this.redo();
    }

    clone<U extends Cloneable<Command>>(): Command {

    }

}