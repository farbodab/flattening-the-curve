import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  phu_data : any;
  test_result_data : any;

  constructor(private api_service : ApiService) { 

  }

  ngOnInit() {

    this.api_service.get_phu_data(data => {
      this.phu_data = data;
    }, error => {
      console.error(error);
    })

    this.api_service.get_test_results_data(data => {
      this.test_result_data = data;
    }, error => {
      console.error(error);
    })
    
  }

}
