import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() shows_title : boolean;
  @Input() page: string;

  window_subscription : Subscription;

  is_full : boolean = true;
  isChecked : boolean = false;

  constructor(private host_service : HostService, private cookieService: CookieService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    })

    if (this.cookieService.get('sitemode')){
      if (this.cookieService.get('sitemode')==='true'){
        this.isChecked = true
      }
      else{
        this.isChecked = false
      }
    }
  }

  onChange(){
    this.cookieService.set('sitemode', this.isChecked.toString(), 365)
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
