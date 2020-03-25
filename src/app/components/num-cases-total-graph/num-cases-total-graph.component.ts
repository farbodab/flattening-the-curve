import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-num-cases-total-graph',
  templateUrl: './num-cases-total-graph.component.html',
  styleUrls: ['./num-cases-total-graph.component.scss']
})
export class NumCasesTotalGraphComponent implements OnInit {

  @Input()
  graph_data : any;

  graph = null;

  constructor() { }

  ngOnInit() {
    this.redraw();
  }

  private redraw() {

    const deaths = this.graph_data['Deaths'];
    const investigations_pct = this.graph_data['Investigation pct'];
    const negatives_pct = this.graph_data['Negative pct'];
    const negatives = this.graph_data['Negatives'];
    const positives = this.graph_data['Positive'];
    const positives_pct = this.graph_data['Positive pct'];
    const resolved = this.graph_data['Resolved'];
    const total = this.graph_data['Total tested'];
    const investigations = this.graph_data['Under Investigation'];

    this.graph = null;

    this.graph = {
      data: [
        { x: Object.keys(total), y: Object.values(total), type: 'scatter', mode: 'lines+markers', name: 'Total tested' },
        { x: Object.keys(investigations), y: Object.values(investigations), type: 'scatter', mode: 'lines+markers', name: 'Under investigation' },
        { x: Object.keys(investigations_pct), y: Object.values(investigations_pct), type: 'bar', name: 'Investigation', yaxis: 'y2', xaxis: 'x2', marker: { color: 'purple' }},
        { x: Object.keys(negatives_pct), y: Object.values(negatives_pct), type: 'bar', name: 'Negatives',  yaxis: 'y2', xaxis: 'x2', marker: { color: 'red' }},
        { x: Object.keys(positives_pct), y: Object.values(positives_pct), type: 'bar', name: 'Positives', yaxis: 'y2', xaxis: 'x2', marker: { color: 'green' }},
      ],
      layout: {barmode: 'stack', yaxis:
        {
          title: 'Number of Tests',
        },
        yaxis2:
          {
            title: 'Proportion of Tests',
          },
        grid: {rows:2, columns: 1, pattern: 'independent'}
      }
    };
  }

}
