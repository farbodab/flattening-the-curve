import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-test-proportion-by-result',
  templateUrl: './data-test-proportion-by-result.component.html',
  styleUrls: ['./data-test-proportion-by-result.component.scss']
})
export class DataTestProportionByResultComponent implements OnInit {

  @Input()
  graph_data : any;

  constructor() { }

  ngOnInit() {
  }

}
