import {Interceptor} from "aurelia-fetch-client";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";

@inject(EventAggregator)
export class FetchClientInterceptor implements Interceptor {

    constructor(private eventAgg:EventAggregator) {

    }

    request(request) : Request | Response | Promise<Request | Response> {
        return request;
    }

    requestError(error: any) : Request | Response | Promise<Request | Response> {
        this.publish(error);
        //todo figure out how to return request?
        return null;
    }

    response(response) : Response | Promise<Response> {
        return response;
    }

    responseError(error: any) : Response | Promise<Response> {
        this.publish(error);
        //todo figure out how to return request?
        return null;
    }

    publish(error: any) : void {
        this.eventAgg.publish('fetchError', error);
    }

}

//create special event type
export class FetchError {
    // public static name:string = 'fetchError';

    constructor(public data:any) {
        this.data = data;
    }

}
