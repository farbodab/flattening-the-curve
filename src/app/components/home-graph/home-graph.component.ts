import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-graph',
  templateUrl: './home-graph.component.html',
  styleUrls: ['./home-graph.component.scss']
})

export class HomeGraphComponent implements OnInit {

  @Input()
  graph_data: any;

  graph = null;

  ngOnInit() {
    this.redraw();
  }

  private redraw() {

    const ontario = this.graph_data['Ontario'];
    const italy = this.graph_data['Italy'];
    const korea = this.graph_data['South Korea'];
    const singapore = this.graph_data['Singapore'];

    this.graph = null;

    const last = Object.keys(ontario).length.toString()
    const last_middle = (Object.keys(ontario).length + 8).toString()
    const last_end = (Object.keys(ontario).length + 14).toString()

    this.graph = {
      data: [
        { x: Object.keys(ontario), y: Object.values(ontario), type: 'scatter', mode: 'lines+markers', marker: { color: 'red' }, name: 'Ontario' },
        { x: Object.keys(italy), y: Object.values(italy), type: 'scatter', mode: 'lines+points', marker: { color: '#C0C0C0' }, name: 'Italy', yaxis: 'y', xaxis: 'x2',},
        { x: Object.keys(korea), y: Object.values(korea), type: 'scatter', mode: 'lines+points', marker: { color: '#C0C0C0' }, name: 'South Korea', yaxis: 'y', xaxis: 'x3', },
      ],
      layout: {
        margin: {t: 10, b:50, r:0, l:30},
        showlegend: false,
        grid: {rows:1, columns: 3, subplots:[['xy','x2y','x3y']]},
        yaxis:
        {
          range: [0, 500]
        },
        yaxis2:
        {
          range: [0, 500]
        },
        yaxis3:
        {
          range: [0, 500]
        },
        shapes: [
          {
            type: 'rect',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'y',
            x0: 0,
            y0: 150,
            x1: 30,
            y1: 500,
            fillcolor: '#d3d3d3',
            opacity: 0.2,
            line: {
              width: 0
            }
          },
          {
            type: 'rect',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'y',
            x0: 0,
            y0: 425,
            x1: 30,
            y1: 500,
            fillcolor: '#585858',
            opacity: 0.2,
            line: {
              width: 0
            },
          },
          {
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: last,
            y0: 0,
            x1: last_end,
            y1: 1,
            fillcolor: '#205d86',
            opacity: 0.2,
            line: {
                width: 0
            },},

        ],
        annotations: [
          {
            x: 15,
            y: 160,
            xref: 'x',
            yref: 'y',
            text: 'ICU 10% Capacity',
            showarrow: false,
          },
          {
            x: 15,
            y: 435,
            xref: 'x',
            yref: 'y',
            text: 'ICU 25% Capacity',
            showarrow: false,
          },
          {
            x: last_middle,
            y: 10,
            xref: 'x',
            yref: 'y',
            text: '1-2 week lag',
            showarrow: false,
          },
          {
            x: last_middle,
            y: 30,
            xref: 'x',
            yref: 'y',
            text: 'Actions have',
            showarrow: false,
          }
        ],
      },
    };
  }
}
