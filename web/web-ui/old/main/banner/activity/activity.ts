import {Class} from 'lang/class';
import {CarouselViewModel} from 'common/carousel/carousel-item';
import {inject, bindable, Container} from 'aurelia-framework';

import {ActivityManager, Activity as Act, Period} from 'model/activity/activity'

@inject(Container, ActivityManager)
export class Activity implements CarouselViewModel {

    @bindable
    private currentPeriod:Period;

    active: false;
    title: string = "Activity";
    view: Class<Activity> = Activity;

    constructor(
        private container:Container,
        private activityManager:ActivityManager
    ) {

    }

    attached() {


    }


}