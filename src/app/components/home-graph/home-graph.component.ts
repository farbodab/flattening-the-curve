import { Component, OnInit, Input, HostListener } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-home-graph',
    templateUrl: './home-graph.component.html',
    styleUrls: ['./home-graph.component.scss']
})
export class HomeGraphComponent implements OnInit {

    @Input() graph_data : any;

    graph = null;


    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.redraw();
    }

    ngOnInit() {
        this.redraw();
    }

    private redraw() {
        const ontario = this.graph_data['Ontario'];
        const italy = this.graph_data['Italy'];
        const korea = this.graph_data['South Korea'];

        this.graph = null;

        this.graph = {
            data: [
                { x: Object.keys(ontario), y: Object.values(ontario), type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
                { x: Object.keys(italy), y: Object.values(italy), type: 'scatter', mode: 'lines+points', marker: {color: 'blue'} },
                { x: Object.keys(korea), y: Object.values(korea), type: 'scatter', mode: 'lines+points', marker: {color: 'green'} },
            ],
            layout: {title: 'A Fancy Plot'}
        };
    }
   
}
