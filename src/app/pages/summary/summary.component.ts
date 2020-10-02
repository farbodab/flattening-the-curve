import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { ApiService } from '../../services/api.service';
import { HostService } from '../../services/host.service';
import { Subscription } from 'rxjs';

@Component({
    selector: "app-summary",
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})

export class SummaryComponent implements OnInit {
    jsonObj: any;
    is_full = true;

    constructor(private host_service: HostService, private api_service: ApiService) {
      this.refresh_layout(window.innerWidth);
    }

    ngOnInit() {
      this.fetchDataObj();
    }

    ngAfterViewInit() {

    }

    fetchDataObj() {
    this.api_service.get_summary_obj().subscribe(
      data => {
        this.jsonObj = data;
        console.log(data)
      },
      error => {
        this.jsonObj = 'error';
      }
    );
  }

  private refresh_layout(width) {
  this.is_full = window.innerWidth >= 1024 ? true : false;
  }

}
