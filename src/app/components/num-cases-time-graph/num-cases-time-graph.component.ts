import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-num-cases-time-graph',
  templateUrl: './num-cases-time-graph.component.html',
  styleUrls: ['./num-cases-time-graph.component.scss']
})
export class NumCasesTimeGraphComponent implements OnInit {

  @Input()
  graph_data : any;

  constructor() { }

  ngOnInit() {
  }

}
