import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-num-cases-total-graph',
  templateUrl: './num-cases-total-graph.component.html',
  styleUrls: ['./num-cases-total-graph.component.scss']
})
export class NumCasesTotalGraphComponent implements OnInit {

  @Input()
  graph_data : any;

  constructor() { }

  ngOnInit() {
  }

}
