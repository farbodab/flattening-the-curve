import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.html',
  styleUrls: ['./plot.scss']
})

export class PlotComponent implements OnInit {

  @Input() graph_data: any;
  @Input() mobile_size: boolean;
  @Input() font_size_category: string;

  graph = null;

  ngOnInit() {
    this.redraw();
  }

  private redraw() {

    this.graph = null;

    var figure = JSON.parse(this.graph_data);

    this.graph = figure;
    this.graph.layout.dragmode = false;

    console.log(this.font_size_category);

    if (typeof this.graph.data[0].number !== 'undefined') {
      switch (this.font_size_category) {
        case 'small':
          //this.graph.data[0].number.font.size = 45;
          //this.graph.layout.template.layout.font.size = 10;
          break;
        case 'medium':
          //this.graph.data[0].number.font.size = 60;
          //this.graph.layout.font.size = 20;
          break;
        case 'large':
          //this.graph.data[0].number.font.size = 65;
          //this.graph.layout.template.layout.font.size = 10;
          break;
      }
    }

    console.log(this.graph);

    if (this.mobile_size) {
      this.graph.layout.dragmode = false;
    }
  }
}
