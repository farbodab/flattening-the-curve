import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-home-graph',
  templateUrl: './home-graph.component.html',
  styleUrls: ['./home-graph.component.scss']
})
export class HomeGraphComponent implements OnInit {

  @ViewChild('chart', {static:false})
  private chart_container : ElementRef;

  @Input() graph_data : any;

  constructor() { }

  ngOnInit() {
    this.create_chart();
  }

  create_chart() {
    d3.select('svg').remove();

    const keys = Object.keys(this.graph_data);
    const values = keys.map( key => this.graph_data[key] )

    console.log(values);
    
    var margin = {top: 20, right: 20, bottom: 30, left: 40};

    const element = this.chart_container.nativeElement;
    const data = this.graph_data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - margin.left - margin.right;
    const contentHeight = element.offsetHeight - margin.top - margin.bottom;

    
  }
}
