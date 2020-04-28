import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.html',
  styleUrls: ['./plot.scss']
})

export class PlotComponent implements OnInit {

  @Input() graph_data: any;

  @Input() mobile_size: boolean;

  graph = null;

  ngOnInit() {
    this.redraw();
  }

  private redraw() {

    this.graph = null;

    var figure = JSON.parse(this.graph_data);

    this.graph = figure;
    this.graph.layout.dragmode = false;
    if (this.mobile_size) {
      this.graph.layout.dragmode = false;
    }
  }
}
