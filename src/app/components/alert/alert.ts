import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.html',
  styleUrls: ['./alert.scss']
})
export class AlertComponent implements OnInit, OnDestroy {


  window_subscription : Subscription;

  is_full : boolean = true;
  collapsed : boolean = false;
  @Input() text: any;
  @Input() type: any;

  constructor(private host_service : HostService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    })

  }

  ngOnChanges() {
    console.log(this.text);
    console.log(this.type)
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
