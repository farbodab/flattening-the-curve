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
  layout = null;

  ngOnInit() {
    this.redraw();
  }

  ngOnChanges() {
    this.redraw();
  }

  private redraw() {
    this.graph = null;
    this.layout = null;
    this.graph_data = this.graph_data.filter(date => date[this.variable] != null);


    if (this.variable == 'rt_ml') {
      this.layout = {autosize: true, annotations: [
    {
      x: 1,
      y: 0.8,
      xref: 'paper',
      yref: 'y',
      text: 'Green',
      showarrow: false,
    },
    {
      x: 1,
      y: 1,
      xref: 'paper',
      yref: 'y',
      text: 'Yellow',
      showarrow: false,
    },
    {
      x: 1,
      y: 1.25,
      xref: 'paper',
      yref: 'y',
      text: 'Orange',
      showarrow: false,
    },
    {
      x: 1,
      y: 1.5,
      xref: 'paper',
      yref: 'y',
      text: 'Red',
      showarrow: false,
    },


], shapes:[
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 1.4,
                      x1: 1 ,
                      y1: 1.4,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 1.1,
                      x1: 1 ,
                      y1: 1.1,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 0.9,
                      x1: 1 ,
                      y1: 0.9,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
      ]}
    }

    else if (this.variable == 'rolling_pop') {
      this.layout = {autosize: true, annotations: [
    {
      x: 1,
      y: 0.5,
      xref: 'paper',
      yref: 'y',
      text: 'Green',
      showarrow: false,
    },
    {
      x: 1,
      y: 2.5,
      xref: 'paper',
      yref: 'y',
      text: 'Yellow',
      showarrow: false,
    },
    {
      x: 1,
      y: 7.5,
      xref: 'paper',
      yref: 'y',
      text: 'Orange',
      showarrow: false,
    },
    {
      x: 1,
      y: 12,
      xref: 'paper',
      yref: 'y',
      text: 'Red',
      showarrow: false,
    },





], shapes:[
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 1,
                      x1: 1 ,
                      y1: 1,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 5,
                      x1: 1 ,
                      y1: 5,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 10,
                      x1: 1 ,
                      y1: 10,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
      ]}
    }

    else if (this.variable == 'rolling_test_twenty_four') {
      this.layout = {autosize: true, annotations: [
    {
      x: 1,
      y: 0.95,
      xref: 'paper',
      yref: 'y',
      text: 'Green',
      showarrow: false,
    },
    {
      x: 1,
      y: 0.8,
      xref: 'paper',
      yref: 'y',
      text: 'Yellow',
      showarrow: false,
    },
    {
      x: 1,
      y: 0.6,
      xref: 'paper',
      yref: 'y',
      text: 'Orange',
      showarrow: false,
    },
    {
      x: 1,
      y: 0.4,
      xref: 'paper',
      yref: 'y',
      text: 'Red',
      showarrow: false,
    },



], shapes:[
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 0.9,
                      x1: 1 ,
                      y1: 0.9,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 0.7,
                      x1: 1 ,
                      y1: 0.7,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 0.5,
                      x1: 1 ,
                      y1: 0.5,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
      ]}
    }
    else if (this.variable == 'critical_care_pct') {
      this.layout = {autosize: true, annotations: [
    {
      x: 1,
      y: 0.95,
      xref: 'paper',
      yref: 'y',
      text: 'Red',
      showarrow: false,
    },
    {
      x: 1,
      y: 0.85,
      xref: 'paper',
      yref: 'y',
      text: 'Orange',
      showarrow: false,
    },
    {
      x: 1,
      y: 0.7,
      xref: 'paper',
      yref: 'y',
      text: 'Yellow',
      showarrow: false,
    },
    {
      x: 1,
      y: 0.5,
      xref: 'paper',
      yref: 'y',
      text: 'Green',
      showarrow: false,
    },
], shapes:[
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 0.9,
                      x1: 1 ,
                      y1: 0.9,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 0.8,
                      x1: 1 ,
                      y1: 0.8,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: 0.6,
                      x1: 1 ,
                      y1: 0.6,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
      ]}
    }

    var figure = {
        data: [
            { x: this.graph_data.map(x => x["date"]),
              y: this.graph_data.map(x => x[this.variable]),
              type: 'scatter',
              mode: 'lines+points',
            },
        ],
        layout: this.layout,
        config: {
          displayModeBar: false,
        },
        useResizeHandler: true,
        style: {width: "100%", height: "100%"}
    };

    this.graph = figure;
  }
}
