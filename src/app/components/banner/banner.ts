import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.html',
  styleUrls: ['./banner.scss']
})
export class BannerComponent implements OnInit, OnDestroy {


  window_subscription : Subscription;

  is_full : boolean = true;
  collapsed : boolean = true;

  constructor(private host_service : HostService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    })

  }

  onClickMe() {
    this.collapsed = !this.collapsed
  }

  ngOnDestroy() {
    if(this.window_subscription) {
      this.window_subscription.unsubscribe();
    }
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
