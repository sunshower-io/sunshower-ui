import {UUID} from "utils/uuid";


export class CloudServiceProvider {
    id: string;
    name: string;
    datacenters: Datacenter[];
    environments: Environment[];
}
export class Environment {

}

export class Datacenter {
    id: string;
    instanceCount: number;
    name: string;
    status: string;
    latitude: number;
    longitude: number;
}


export class EnvironmentManager {

    listClouds(): CloudServiceProvider[] {
        return [{
            id: UUID.randomUUID().value,
            name: 'AWS',
            datacenters: [
                {
                    id: 'aws1',
                    name: 'US West Oregon(3)',
                    latitude: 33.835,
                    longitude: 238,
                    instanceCount: 64,
                    status: 'healthy',
                },
                {
                    id: 'aws2',
                    name: 'US West Oregon(3)',
                    latitude: 36.835,
                    longitude: 280,
                    instanceCount: 64,
                    status: 'healthy',
                },

                {
                    id: 'aws3',
                    name: 'Belgium',
                    latitude: 50.835,
                    longitude: 18,
                    instanceCount: 45,
                    status: 'unknown',
                },
                {
                    id: 'aws4',
                    name: 'China',
                    latitude: 28.835,
                    longitude: 120,
                    instanceCount: 45,
                    status: 'unhealthy',
                },
            ],
            environments: [],
        }];
    }

    listDataCenters(): Datacenter[] {
        let results = [];
        for (let cloud of this.listClouds()) {
            results = results.concat(cloud.datacenters);
        }
        return results;
    }


}

