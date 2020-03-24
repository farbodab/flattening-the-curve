import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-home-graph',
  templateUrl: './home-graph.component.html',
  styleUrls: ['./home-graph.component.scss']
})
export class HomeGraphComponent implements OnInit {

  @Input() graph_data : any;

  constructor() { }

  ngOnInit() {
    this.create_chart();
  }

  create_chart() {
    
  }
}
