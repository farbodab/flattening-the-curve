import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-testing-over-time',
  templateUrl: './data-testing-over-time.component.html',
  styleUrls: ['./data-testing-over-time.component.scss']
})
export class DataTestingOverTimeComponent implements OnInit {

  @Input()
  graph_data : any;

  @Input()
  graph_new_data: any;

  @Input()
  log_scale: boolean;

  @Input()
  name : any;

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

    this.graph = null;
    this.graph = {
      data: [
        { x: Object.keys(this.graph_data[this.name]), y: Object.values(this.graph_data[this.name]), type: 'bar', mode: 'lines+markers' ,yaxis: 'y', xaxis: 'x'},
      ],
      layout: {
        grid: {rows:1, columns: 1, pattern: 'independent'},
        margin: {t: 10, b:50, r:0, l:50},
        yaxis:
        {
          range: [0, 500]
        },
      }
    };

  }

}
