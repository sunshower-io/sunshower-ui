
import {Stack} from 'lib/common/util';
import {Cloneable} from 'lib/common/lang';

export interface Undoable {
    undo() : void;
}

export interface Redoable {
    redo() : void;
}


export class CommandManager {
    private undoStack : Stack<Command>;
    private redoStack : Stack<Command>;

    constructor() {
        this.undoStack = new Stack<Command>();
        this.redoStack = new Stack<Command>();
    }


    record(cmd: Command) : void {
        this.undoStack.push(cmd);
    }

    execute(cmd: Command) : void {
        cmd.execute();
        this.undoStack.push(cmd);
    }

    undo() : void {
        if(this.canUndo()) {
            let toUndo = this.undoStack.pop();
            toUndo.undo();
            this.redoStack.replace(toUndo);
        }
    }


    redo() : void {
        if(this.canRedo()) {
            let toRedo = this.redoStack.pop();
            toRedo.redo();
            this.undoStack.replace(toRedo);
        }
    }


    canUndo() : boolean {
        return !this.undoStack.isEmpty();
    }

    canRedo() : boolean  {
        return !this.redoStack.isEmpty();
    }


}

export interface Command extends Cloneable<Command>, Undoable, Redoable {

    redo(): void;

    undo(): void;

    execute() : void;

    clone<U extends Cloneable<Command>>(): Command;

}