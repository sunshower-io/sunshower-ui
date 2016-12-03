
import {
    ObservedEvent,
    DefaultEventDispatcher
} from "../utils/observer";

import {Graph, Node, Traversal} from '../algorithms/graph/graph'
import {
    TarjansStronglyConnectedComponents,
    Component
} from '../algorithms/graph/tarjans'

import {UUID} from '../utils/uuid';

import {InfrastructureDescriptor} from "src/task/infrastructure";

type TaskEvent = "task-added" | "task-removed" | "cycle-detected";

const TaskEvent = {
    TaskAdded: "task-added" as TaskEvent,
    TaskRemoved: "task-removed" as TaskEvent,
    CycleDetected: "cycle-detected" as TaskEvent,
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

export class CycleDetectedEvent extends ObservedEvent {

}

export class TaskAddedEvent extends ObservedEvent {
}

export class TaskManager extends DefaultEventDispatcher {


    graph:Graph<Task>;
    cycleDetector: Traversal<Component<Task>[], Task>;

    constructor() {
        super();
        this.graph = new Graph<Task>();
        this.cycleDetector = new TarjansStronglyConnectedComponents<Task>();
    }



    contains(id:UUID) : boolean {
        return this.graph.get(id.value) != null;
    }


    getTasks() : Task[] {
        return this.graph.getNodes().map(m => m.data);
    }


    addTask(task: Task) : void {
        this.graph.add(new Node<Task>(task.id.value, task));
        this.dispatch(TaskEvent.TaskAdded, new TaskAddedEvent(task));
    }


    connect(sourceId:string, targetId:string) : boolean {
        console.log(`SID2: ${sourceId}, ${targetId}`);
        let graph = this.graph,
            source = graph.get(sourceId),
            target = graph.get(targetId),
            result:boolean = false;
        if(!(source && target)) {
            return false;
        } else {
            result = graph.connect(source, target);
        }

        if(result) {
            let components = this.cycleDetector.run(this.graph);
            if(components.length > 0) {
                this.dispatch(
                    TaskEvent.CycleDetected,
                    new CycleDetectedEvent(components)
                );
                this.graph.disconnect(source, target);
                return false;
            }
        }
        return source.data.connect(target.data);
    }

}