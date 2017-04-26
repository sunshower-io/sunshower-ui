
import {Stack} from 'lib/common/util';
import {Cloneable} from 'lib/common/lang';

export interface Undoable {
    undo() : void;
}

export interface Redoable {
    redo() : void;
}


export class CommandManager {
    private undoStack : Command[];
    private redoStack : Command[];

    constructor() {
        this.undoStack = [];
        this.redoStack = [];
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
            this.redoStack.push(toUndo);
        }
    }


    redo() : void {
        if(this.canRedo()) {
            let toRedo = this.redoStack.pop();
            toRedo.redo();
            this.undoStack.push(toRedo);
        }
    }


    canUndo() : boolean {
        return this.undoStack.length > 0;
    }

    canRedo() : boolean  {
        return this.redoStack.length > 0;
    }


}

export interface Command extends Cloneable<Command>, Undoable, Redoable {
    readonly id: string;

    redo(): void;

    undo(): void;

    execute() : void;

    clone<U extends Cloneable<Command>>(): Command;

}