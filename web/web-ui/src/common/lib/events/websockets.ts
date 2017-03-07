import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Event as E} from 'core-js/library';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
export enum Type {
    ChannelBound,
    ChannelConnected,
    ChannelDisconnected,
    SubscriberAdded,
    SubscriberRemoved
}
export interface Lifecycle {

    data?: any;
    type: Type;
}

export interface Subscription {
    id                  : string;
    type                ?: string;
    category            ?: string;
}

export interface Event {

    topicId             : string;
    type                : string;
    category            : string;
}

export class ChannelSet {
    public sessionId:string;
    private readonly socket: WebSocket;
    private readonly subject: Subject<Event>;
    private readonly lifecycle: Subject<Lifecycle>;

    constructor(public endpoint: string, token:string) {
        this.socket = new WebSocket(`${endpoint}?${token}`);
        this.subject = new Subject<Event>();
        this.lifecycle = new Subject<Lifecycle>();
        this.socket.onopen = this.open;
        this.socket.onmessage = this.onMessage;
    }

    lifecycleChannel(): Observable<Lifecycle> {
        return this.lifecycle;
    }

    subscribe(subscription: Subscription): Observable<Event> {
        this.socket.send(subscription.id);
        return this.subject.map(t => {
            console.log("GOT ONE: ", t);
            return t as Event
        }).filter(t => t.topicId === subscription.id);
    }

    private onMessage = (e: E) => {
        let msg = JSON.parse((e as any).data);
        this.checkSessionId(msg);
        this.subject.next(msg as any);
    };

    private checkSessionId(msg: any) {
        if(msg && msg.type && msg.type === "sessionDescriptor" && msg.sessionId) {
            this.sessionId = msg.sessionId;
            this.lifecycle.next({
                type: Type.ChannelBound,
                data: msg.sessionId
            })
        }
    }


    private close = (e: E) => {
        this.lifecycle.next({
            type: Type.ChannelDisconnected
        });
    };

    private open = (e: E) => {
        console.log("CONNECTED");
        let msg = (e as any).data;
        this.lifecycle.next({
            type: Type.ChannelConnected
        });
    }

}

