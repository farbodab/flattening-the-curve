import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.html',
  styleUrls: ['./vaccine.scss']
})
export class VaccineComponent implements OnInit, OnDestroy {


  window_subscription : Subscription;

  is_full : boolean = true;
  data : any;


  constructor(private host_service : HostService, private api_service: ApiService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    })
    this.fetchDataObj()
  }

  ngOnChanges() {

  }

  ngOnDestroy() {
    if(this.window_subscription) {
      this.window_subscription.unsubscribe();
    }
  }

  fetchDataObj() {
    this.api_service.get_vaccine_obj().subscribe(
      data => {
        this.data = data[0];
        this.data['total_doses_administered'] = this.data['total_doses_administered'].toString().padStart(8, '0');
      },
      error => {
      }
    );
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
