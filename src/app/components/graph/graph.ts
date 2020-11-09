import { Component, OnInit, Input, OnChanges, SimpleChange, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.html',
  styleUrls: ['./graph.scss']
})

export class GraphComponent implements OnInit, OnChanges {

  @Input() graph_data: any;
  @Input() title: string;
  @Input() variable: string;



  graph = null;

  ngOnInit() {
    this.redraw();
  }

  ngOnChanges() {
    this.redraw();
  }

  private redraw() {
    this.graph = null;
    this.graph_data = this.graph_data.filter(date => date[this.variable] != null);
    var figure = {
        data: [
            { x: this.graph_data.map(x => x["date"]),
              y: this.graph_data.map(x => x[this.variable]),
              type: 'scatter',
              mode: 'lines+points',
            },
        ],
        layout: {title: this.title, autosize: true},
        config: {
          displayModeBar: false,
        }
    };
    this.graph = figure;
  }
}
