
import {
    ObservedEvent,
    DefaultEventDispatcher
} from "../utils/observer";

import {UUID} from '../utils/uuid';

import {InfrastructureDescriptor} from "src/task/infrastructure";

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

    public deploymentTargets: InfrastructureDescriptor[];

    public id: UUID;

    constructor (
        public icon: string,
        public name: string,
        public location?: Point,
        public subtasks?: Task[],
        public successors?: {[id:string]:Task}
    ) {
        this.id = UUID.randomUUID();

    }

    addDeploymentTarget(target:InfrastructureDescriptor) : Task {
        if(!this.deploymentTargets) {
            this.deploymentTargets = [];
        }
        this.deploymentTargets.push(target);
        return this;
    }


    connect(target:Task) : boolean {
        if(!this.successors) {
            this.successors = {};
        }
        if(!this.successors[target.id.value]) {
            this.successors[target.id.value] = target;
            return true;
        }
        return false;
    }

}

export class TaskAddedEvent extends ObservedEvent {
}

export class TaskManager extends DefaultEventDispatcher {


    tasks: {[key:string]:Task};

    constructor() {
        super();
        this.tasks = {};
    }




    getTasks() : Task[] {
        let results = [];
        for(var value in this.tasks) {
            results.push(this.tasks[value]);
        }
        return results;
    }


    addTask(task: Task) : void {
        this.dispatch(TaskEvent.TaskAdded, new TaskAddedEvent(task));
        this.tasks[task.id.value] = task;
    }


    connect(sourceId:string, targetId:string) : boolean {
        let source = this.tasks[sourceId],
            target = this.tasks[targetId];
        return source.connect(target);
    }

}