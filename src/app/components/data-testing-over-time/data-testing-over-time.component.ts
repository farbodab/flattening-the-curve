import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-testing-over-time',
  templateUrl: './data-testing-over-time.component.html',
  styleUrls: ['./data-testing-over-time.component.scss']
})
export class DataTestingOverTimeComponent implements OnInit {

  @Input()
  graph_data : any;

  constructor() { }

  ngOnInit() {
  }

}
