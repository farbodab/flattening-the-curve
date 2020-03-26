import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-graph-ont',
  templateUrl: './home-graph-ont.component.html',
  styleUrls: ['./home-graph-ont.component.scss']
})

export class HomeGraphOntComponent implements OnInit {

  @Input()
  graph_data: any;

  @Input()
  name: any;

  graph = null;

  ngOnInit() {
    this.redraw();
  }

  private redraw() {

    const graph = this.graph_data[this.name];

    this.graph = null;

    const last = (Object.keys(graph).length - 1).toString()
    const last_middle = (Object.keys(graph).length + 6).toString()
    const last_end = (Object.keys(graph).length + 14).toString()


    this.graph = {
      data: [
        { x: Object.keys(graph), y: Object.values(graph), type: 'scatter', mode: 'lines+markers', marker: { color: 'red' } },
      ],
      layout: {
        margin: {t: 10, b:50, r:0, l:30},
        showlegend: false,
        yaxis:
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
            x: 10,
            y: 160,
            xref: 'x',
            yref: 'y',
            text: 'ICU 10% Surge Capacity',
            showarrow: false,
          },
          {
            x: 10,
            y: 435,
            xref: 'x',
            yref: 'y',
            text: 'ICU 25% Surge Capacity',
            showarrow: false,
          },
          {
          x: last_middle,
          y: 0,
          xref: 'x',
          yref: 'y',
          text: 'Actions taken have 1-2 week lag',
          showarrow: true,
          arrowhead: 7,
          ax: 0,
          ay: +40
        }
        ],
      },
    };
  }
}
