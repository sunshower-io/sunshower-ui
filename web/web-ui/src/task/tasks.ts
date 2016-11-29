
import {
    ObservedEvent,
    DefaultEventDispatcher
} from "../utils/observer";

type TaskEvent = "task-added" | "task-removed";

const TaskEvent = {
    TaskAdded: "task-added" as TaskEvent,
    TaskRemoved: "task-removed" as TaskEvent
};


export class Task {
    icon: string;
    name: string
    subtasks: Task[];
    successors: Task[];
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