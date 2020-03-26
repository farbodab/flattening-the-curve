import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-graph',
  templateUrl: './home-graph.component.html',
  styleUrls: ['./home-graph.component.scss']
})

export class HomeGraphComponent implements OnInit {

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


    this.graph = {
      data: [
        { x: Object.keys(graph), y: Object.values(graph), type: 'scatter', mode: 'lines', marker: { color: 'grey' } },
      ],
      layout: {
        margin: {t: 10, b:50, r:0, l:30},
        showlegend: false,
        yaxis:
        {
          range: [0, 500]
        },
      },
    };
  }
}
