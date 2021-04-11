import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chevron',
  templateUrl: './chevron.html',
  styleUrls: ['./chevron.scss']
})
export class ChevronComponent implements OnInit, OnDestroy {

  @Input() date : any;
  @Input() key : any;

  window_subscription : Subscription;

  is_full : boolean = true;
  isChecked : boolean = false;

  constructor(private host_service : HostService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    })

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
