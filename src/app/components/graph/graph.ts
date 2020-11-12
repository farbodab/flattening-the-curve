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
  @Input() text_green: any;
  @Input() text_yellow: any;
  @Input() text_orange: any;
  @Input() text_red: any;
  @Input() line_green: any;
  @Input() line_yellow: any;
  @Input() line_orange: any;
  @Input() image: any;

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
        layout: {title: this.title, autosize: true, images: [
          {
            x: 0,
            y: 1,
            sizex: 1,
            sizey: 1,
            source: `assets/img/graphs/${this.image}.svg`,
            xref: "paper",
            yref: "paper",
            sizing: "stretch",
            "opacity": 0.5,
          },],annotations: [
    {
      x: 1,
      y: this.text_green,
      xref: 'paper',
      yref: 'y',
      text: 'Green',
      showarrow: false,
    },
    {
      x: 1,
      y: this.text_yellow,
      xref: 'paper',
      yref: 'y',
      text: 'Yellow',
      showarrow: false,
    },
    {
      x: 1,
      y: this.text_orange,
      xref: 'paper',
      yref: 'y',
      text: 'Orange',
      showarrow: false,
    },
    {
      x: 1,
      y: this.text_red,
      xref: 'paper',
      yref: 'y',
      text: 'Red',
      showarrow: false,
    },





],shapes: [
                {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: this.line_green,
                      x1: 1 ,
                      y1: this.line_green,
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
                      y0: this.line_yellow,
                      x1: 1 ,
                      y1: this.line_yellow,
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
                      y0: this.line_orange,
                      x1: 1 ,
                      y1: this.line_orange,
                      line: {
                        color: 'black',
                        width: 1,
                        dash: 'dot'
                      }
                },
      ]},
        config: {
          displayModeBar: false,
        }
    };
    this.graph = figure;
  }
}
