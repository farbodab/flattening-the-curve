import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-home-graph',
    template: `
    <plotly-plot [data]="graph.data" [layout]="graph.layout"
       [useResizeHandler]="true" [style]="{position: 'relative', width: '100%', height: '100%'}">
    </plotly-plot>`,
})
export class HomeGraphComponent {
    public graph = {
        data: [
            { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
            { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
        ],
        layout: {width: 500, height: 500, title: 'A Fancy Plot'}
    };
}
