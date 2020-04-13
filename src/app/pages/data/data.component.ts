import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, AfterViewInit {

  jsonObj: any;

  constructor(private api_service: ApiService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.fetchDataObj();
  }

  fetchDataObj() {
    this.api_service.get_data_obj().subscribe(
      data => {
        this.jsonObj = data;
        console.log(this.jsonObj);
      },
      error => {
        this.jsonObj = 'error';
      }
    );
  }

}
