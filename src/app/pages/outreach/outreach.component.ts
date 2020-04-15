import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-outreach',
  templateUrl: './outreach.component.html',
  styleUrls: ['./outreach.component.scss']
})
export class OutreachComponent implements OnInit {
  window_subscription: Subscription;
  is_full = true;
  
  constructor(private host_service: HostService) { 
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    });
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
    console.log(this.is_full);
  }

}
