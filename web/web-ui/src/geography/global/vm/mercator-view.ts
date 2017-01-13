import * as d3 from 'd3';
import * as Datamap from 'datamaps';
import {EnvironmentManager} from "environment/environment";
import {inject} from "aurelia-dependency-injection";


@inject(EnvironmentManager)
export class MercatorView {

    private map:Datamap;
    private element: HTMLElement;



    constructor(private environment: EnvironmentManager) {
    }


    activate(): void {

    }


    attached(): void {
        if(!this.map) {
            let map = new Datamap({
                fills: {
                    defaultFill: 'url(#horizontal-stripe)',
                    error: 'red',
                    bubbles: '#171b2c'
                },
                done: (datamap) => {
                    let redraw = () => {
                        datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    };
                    datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));

                    datamap.svg.selectAll(".datamaps-subunit").on("click", (geo) => {

                    })

                },

                element: this.element,
                geographyConfig: {
                    borderWidth: 0,
                    highlightBorderWidth: 2,
                    highlightFillColor: '#171b2c',
                    highlightFillOpacity: '.65',
                    highlightBorderColor: '#ffffff',
                },
                bubblesConfig: {
                    fillColor: '#171bc2',
                    fillOpacity: 1,
                    borderWidth: 1,
                },
                zoomConfig: {
                    zoomOnClick: true,
                    zoomFactor: 1
                }
            });
            this.registerPlugins(map);
            let dcs = this.environment.listDataCenters().map(dc => {
                let dca = dc as any;
                dca.radius = 15;
                dca.borderColor = this.colorFor(dc.status),
                    dca.fillOpacity = 1;
                dca.fillKey = 'bubbles';
                return dca;

            });
            map.bubbles(dcs);
            map.labelDatacenters(dcs, {labelColor: 'red', labelKey:'fillKey'});
            this.map = map;
        }


    }

    colorFor(status:string) : string {
        switch(status) {
            case 'healthy':
                return 'green';
            case 'unhealthy':
                return 'red';
            default:
                return 'yellow';
        }
    }

    private registerPlugins(map: Datamap) {
        let labelPlugin = function (layer: any, data: any, options: any) {
            let self = this as Datamap;
            options = options || {};
            d3.selectAll(".datamaps-bubble")
                .attr("data-foo", function (datum) {
                    let coords = self.latLngToXY(datum.latitude, datum.longitude);
                    console.log("X", coords[0]);
                    layer.append("text")
                        .attr("x", coords[0] - 4)
                        .attr("y", coords[1] + 3)
                        .style("font-size", (options.fontSize || 8) + 'px')
                        .style('font-weight', 100)
                        .style("font-family", options.fontFamily || "'Open Sans Regular',Muli,'Helvetica Neue',Arial,Helvetica,sans-serif;")
                        .style("fill", options.labelColor || "#FFF")
                        .style('stroke', '#fff')
                        .text(datum['instanceCount']);
                    return "bar";
                });

        };

        map.addPlugin('labelDatacenters', labelPlugin);
    }

}