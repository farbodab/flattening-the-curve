import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.html',
  styleUrls: ['./plot.scss']
})

export class PlotComponent implements OnInit, OnChanges {

  @Input() graph_data: any;
  @Input() mobile_size: boolean;
  @Input() font_size_category: string;
  @Input() display_average: any;

  graph = null;

  ngOnInit() {
    this.redraw();
  }

  ngOnChanges() {
    this.redraw();
  }

  private redraw() {
    this.graph = null;
    var figure = JSON.parse(this.graph_data);

    let data_placeholder = '';

    console.log(this.display_average);

    if (this.display_average === 'none') {
      data_placeholder = figure.data;
    } else if (this.display_average) {
        data_placeholder = figure.data;
    } else {
        data_placeholder = figure.data.filter(element => {
        return element.name !== '7 Day Average';
      });
    }

    figure.data = data_placeholder;

    this.graph = figure;
    this.graph.layout.dragmode = false;

    //let title_text = this.graph.layout.title.text.split('<br>');

    // if (true) {
    //   switch (this.font_size_category) {
    //     case 'small':
    //       title_text[0] = '<span style="font-size: 1.25em">' + title_text[0] + '</span>';
    //       this.graph.layout.title.text = title_text[0] + '<br>' + title_text[1] + '<br>';
    //       break;
    //     case 'medium':
    //       title_text[0] = '<span style="font-size: 1.25em">' + title_text[0] + '</span>';
    //       this.graph.layout.title.text = title_text[0] + '<br>' + title_text[1] + '<br>';
    //       break;
    //     case 'large':
    //       title_text[0] = '<span style="font-size: 1.25em">' + title_text[0] + '</span>';
    //       this.graph.layout.title.text = title_text[0] + '<br>' + title_text[1] + '<br>';
    //       break;
    //   }
    // }

    if (this.mobile_size) {
      this.graph.layout.dragmode = false;
    }
  }
}
