
import {
    ObservedEvent,
    DefaultEventDispatcher
} from "../utils/observer";

type TaskEvent = "task-added" | "task-removed";

const TaskEvent = {
    TaskAdded: "task-added" as TaskEvent,
    TaskRemoved: "task-removed" as TaskEvent
};


export interface Point {
    x:number;
    y:number;
}

export class Task {


    constructor (

        public icon: string,
        public name: string,
        public location?: Point,
        public subtasks?: Task[],
        public successors?: Task[]
    ) {

    }
}

export class TaskAddedEvent extends ObservedEvent {
}

export class TaskManager extends DefaultEventDispatcher {


    tasks: Task[];


    constructor() {
        super();
        this.tasks = [];
    }


    addTask(task: Task) : void {
        this.dispatch(TaskEvent.TaskAdded, new TaskAddedEvent(task));
        this.tasks.push(task);
    }

}