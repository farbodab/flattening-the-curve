import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-num-cases-time-graph',
  templateUrl: './num-cases-time-graph.component.html',
  styleUrls: ['./num-cases-time-graph.component.scss']
})
export class NumCasesTimeGraphComponent implements OnInit {

  @Input()
  graph_data : any;

  @Input()
  graph_new_data: any;

  @Input()
  log_scale: boolean;

  graph = null;

  type = null;

  constructor() { }

  ngOnInit() {
    this.redraw();
  }

  ngOnChanges(){
    this.redraw();
  }

  private redraw() {


    const ontario = this.graph_data['Ontario'];
    const ontario_n = this.graph_new_data['Ontario'];

    this.graph = null;
    this.graph = {
      data: [
        { x: Object.keys(ontario), y: Object.values(ontario), type: 'scatter', name: 'Total Cases Ontario', mode: 'lines+markers', yaxis: 'y', xaxis: 'x', marker: { color: 'red' }},
        { x: Object.keys(ontario_n), y: Object.values(ontario_n), type: 'scatter', name: 'New Cases Ontario', mode: 'lines+markers', yaxis: 'y', xaxis: 'x', marker: { color: 'green' }},
      ],
      layout: {yaxis:
        {
          type: this.type,
        },
        margin: {t: 10, b:50, r:0, l:50},
        showlegend: false,
      }
    };









  }

}
