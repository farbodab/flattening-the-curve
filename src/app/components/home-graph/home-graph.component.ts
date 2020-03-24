import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-home-graph',
    templateUrl: './home-graph.component.html',
    styleUrls: ['./home-graph.component.scss']
})
export class HomeGraphComponent implements OnInit {

    @Input() graph_data : any;

    ngOnInit() {
        console.log(this.graph_data);
    }

    public graph = {
        data: [
            { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
            { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
        ],
        layout: {width: 500, height: 500, title: 'A Fancy Plot'}
    };
}
