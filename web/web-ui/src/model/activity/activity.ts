export class Detail {

    name: string;
    value: string;
    style: string;
}


export class Activity {
    name: string;
    description: string;
    details: Detail[];
    href: string;
    image: string;
}


export class Period {
    name: string;
    active: boolean;
    activities: Activity[];
}

export class ActivityManager {

    private _periods: Period[];

    constructor() {
        this._periods = [
            {
                name: 'January 2017',
                active: true,
                activities: [
                    {
                        name: 'Dec. 25, 12:00pm',
                        description: 'Something about green and AWS',
                        details: [
                            {
                                name: 'Status',
                                value: 'Fail',
                                style: 'status fail'
                            }, {
                                name: 'VMs',
                                value: '1',
                                style: ''
                            }
                        ],
                        href: 'http://google.com',
                        image: 'https://68.media.tumblr.com/avatar_7b086178a061_128.png'
                    },
                    {
                        name: 'Dec. 25, 12:00pm',
                        description: 'Something about green and AWS',
                        details: [
                            {
                                name: 'Status',
                                value: 'Success',
                                style: 'status success'
                            }, {
                                name: 'Apps',
                                value: '3',
                                style: ''
                            }
                        ],
                        href: 'http://google.com',
                        image: 'https://68.media.tumblr.com/avatar_7b086178a061_128.png'
                    }
                ]
            }, {
                name: 'December 2016',
                active: false,
                activities: [
                    {
                        name: 'Dec. 25, 12:00pm',
                        description: 'Something about green and AWS',
                        details: [
                            {
                                name: 'Commits',
                                value: 'Whatever',
                                style: ''
                            }
                        ],
                        href: 'http://google.com',
                        image: 'https://68.media.tumblr.com/avatar_7b086178a061_128.png'
                    }
                ]
            }
        ]
    }

    periods(): Period[] {
        return this._periods;
    }

}