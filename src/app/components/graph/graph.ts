import { Component, OnInit, Input, OnChanges, SimpleChange, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.html',
  styleUrls: ['./graph.scss']
})

export class GraphComponent implements OnInit, OnChanges {

  @Input() graph_data: any;
  @Input() mobile_size: boolean;
  @Input() font_size_category: string;
  @Input() display_average: any;
  @Input() view: string;
  @Input() cat: string;
  @Input() analysis: boolean;

  graph = null;

  ngOnInit() {
    this.redraw();
  }

  ngOnChanges() {
    this.redraw();
  }

  private redraw() {
    this.graph = null;
    var figure = {
        data: [
            { x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+points',
              marker: {color: 'red'}
            },
        ],
        layout: {width: '100%', height: '100%', title: 'A Fancy Plot'},
        config: {
          displayModeBar: false,
        }
    };
    this.graph = figure;
  }
}
