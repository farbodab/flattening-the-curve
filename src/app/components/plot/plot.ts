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
  @Input() view: string;

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

    let data_placeholder_average: any;
    let data_placeholder_view: any;

    console.log(JSON.parse(this.graph_data));

    console.log(this.display_average);

    if (this.view === 'week') {
      let week_data = figure.data;
      data_placeholder_view = week_data.filter((element, index) => {
        let view_array_x = [];
        let view_array_y = [];
        if (typeof element.x !== 'undefined') {
          element.x.reverse().forEach((xElement, xIndex) => {
            if (xIndex < 8) {
              console.log(xIndex);
              view_array_x.push(xElement);
            }
          });
          element.x = view_array_x.reverse();
          element.y.reverse().forEach((yElement, yIndex) => {
            if (yIndex < 8) {
              view_array_y.push(yElement);
            }
          });
          element.y = view_array_y.reverse();
        }
      });
      data_placeholder_view = week_data;
    } else if (this.view === 'allTime') {
      data_placeholder_view = figure.data;
    } else if (this.view === 'none') {
      data_placeholder_view = figure.data;
    }

    console.log(data_placeholder_view);


    let average_array = [];
    if (this.display_average === 'none') {
      data_placeholder_average = data_placeholder_view;
    } else if (this.display_average) {
      data_placeholder_average = data_placeholder_view;
    } else {
      data_placeholder_average = data_placeholder_view.filter(element => {
        console.log(element);
        if (element.name !== '7 Day Average') {
          average_array.push(element);
          console.log(average_array);
        }
      });
      data_placeholder_average = average_array;
    }

    figure.data = data_placeholder_average;

    console.log(data_placeholder_average);

    this.graph = figure;
    console.log(this.graph);
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
