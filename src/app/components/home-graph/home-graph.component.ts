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

    this.graph = {
      data: [
        { x: Object.keys(ontario), y: Object.values(ontario), type: 'scatter', mode: 'lines+markers', marker: { color: 'red' }, name: 'Ontario' },
        { x: Object.keys(italy), y: Object.values(italy), type: 'scatter', mode: 'lines+points', marker: { color: '#C0C0C0' }, name: 'Italy' },
        { x: Object.keys(korea), y: Object.values(korea), type: 'scatter', mode: 'lines+points', marker: { color: '#C0C0C0' }, name: 'South Korea' },
        { x: Object.keys(singapore), y: Object.values(singapore), type: 'scatter', mode: 'lines+points', marker: { color: '#C0C0C0' }, name: 'Singapore' },
      ],
      layout: {
        yaxis:
        {
          title: 'ICU Beds',
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
            }
          },
        ],
        annotations: [
          {
            x: 5,
            y: 160,
            xref: 'x',
            yref: 'y',
            text: 'ICU 10% Capacity',
            showarrow: false,
          },
          {
            x: 5,
            y: 435,
            xref: 'x',
            yref: 'y',
            text: 'ICU 25% Capacity',
            showarrow: false,
          }
        ],
        xaxis:
        {
          title: 'Days after 100 cases'
        }
      },
    };
  }
}
