import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-regional-map',
  templateUrl: './data-regional-map.component.html',
  styleUrls: ['./data-regional-map.component.scss']
})
export class DataRegionalMapComponent implements OnInit {

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
        {
          x: [1,2,3],
          y: [1,2,3]
        }
      ],
    }
  }

}
