export class DataService {

    private dataSets:Array<DataSet>;

    constructor(nodeId:string) {
        this.dataSets = this.getRandomDataSets(nodeId);
    }
    
    private getRandomDataSets(nodeId:string) : Array<DataSet> {
        let dataSet = [
            {
                name: 'CPU Usage',
                metrics: ['user', 'sys', 'idle'],
            }, {
                name: 'Physical Memory',
                metrics: ['used', 'unused'],
            }, {
                name: 'Disk I/O',
                metrics: ['read', 'written'],
            }
        ];
        
        let result:Array<DataSet> = [];

        dataSet.forEach((d) => {
            d.metrics.forEach((name) => {
                let newDataSet = new DataSet(nodeId, name, d.name);
                for (var i = 0; i < 15; i++) {
                    newDataSet.add(getRandomDataInRange(0, 100))
                }  
                result.push(newDataSet);
            });

        });
        
        return result;
    }
    
    getDataSets(nodeId:string) : Array<DataSet> {
        return this.dataSets;    
    }

    getDataSetCategories(nodeId:string) : Array<string> {
        var flags = [], categories = [], l = this.dataSets.length;
        for(var i = 0; i < l; i++) {
            if (flags[this.dataSets[i].category]) 
                continue;
            flags[this.dataSets[i].category] = true;
            categories.push(this.dataSets[i].category);
        }    
        return categories
    }
}

export class DataSet {
    nodeId: string; // the node the metric came from
    name: string;   // the name of the metric i.e. user, sys, real
    date: Date;
    category: string; // metric category i.e. CPU usage
    data: Array<number>; // data point i.e. 2.56

    constructor(
        nodeId:string,
        name:string,
        category:string
    ) {
        this.nodeId = nodeId;
        this.name = name;
        this.category = category;
        this.data = [];
    }
    
    add(data:number):void {
        this.data.push(data);
    }
    
}

function getRandomData() {
    return Math.random();
}

function getRandomDataInRange(lower: number, upper: number) {
    return Math.floor(Math.random() * upper) + lower
}
