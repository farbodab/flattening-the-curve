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
    let title_text = this.graph.layout.title.text.split('<br>');

    if (true) {
      switch (this.font_size_category) {
        case 'small':
          title_text[0] = '<span style="font-size: 1.25em">' + title_text[0] + '</span>';
          this.graph.layout.title.text = title_text[0] + '<br>' + title_text[1] + '<br>';
          break;
        case 'medium':
          title_text[0] = '<span style="font-size: 1.25em">' + title_text[0] + '</span>';
          this.graph.layout.title.text = title_text[0] + '<br>' + title_text[1] + '<br>';
          break;
        case 'large':
          title_text[0] = '<span style="font-size: 1.25em">' + title_text[0] + '</span>';
          this.graph.layout.title.text = title_text[0] + '<br>' + title_text[1] + '<br>';
          break;
      }
    }

    console.log(this.graph);

    if (this.mobile_size) {
      this.graph.layout.dragmode = false;
    }
  }
}
