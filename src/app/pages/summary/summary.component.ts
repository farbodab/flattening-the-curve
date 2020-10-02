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
    data: any;
    cases: any;
    icu: any;
    testing: any;
    rt: any;
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
      (data: Array<any>) => {
        this.data = data;
        this.cases = data.filter(date => date["rolling_pop"] != null)
        this.cases = this.cases[this.cases.length - 1]
        this.icu = data.filter(date => date["critical_care_pct"] != null)
        this.icu = this.icu[this.icu.length - 1]
        this.testing = data.filter(date => date["rolling_test_twenty_four"] != null)
        this.testing = this.testing[this.testing.length - 1]
        this.rt = data.filter(date => date["rt_ml"] != null)
        this.rt = this.rt[this.rt.length - 1]
      },
      error => {
        this.data = 'error';
      }
    );
  }

  // const result = props.data.filter(date => date[props.index] != null);
  // const  summary = result[result.length - 1]

  private refresh_layout(width) {
  this.is_full = window.innerWidth >= 1024 ? true : false;
  }

}
