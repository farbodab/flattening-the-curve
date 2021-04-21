import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';

declare var tableau: any;

@Component({
  selector: 'app-tableau',
  templateUrl: './story.html',
  styleUrls: ['./story.scss']
})
export class TableauComponent implements OnInit, OnDestroy {

  window_subscription : Subscription;
  is_full : boolean = true;
  viz: any;

  constructor(private host_service : HostService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    })

    var placeholderDiv = document.getElementById('vizContainer');
    var url = 'https://public.tableau.com/views/ICUBedSituation/Dashboard1?:language=en&:display_count=y&:origin=viz_share_link';
    var options = {
        hideTabs: true,
        margin: "0 auto",
        onFirstInteractive: function() {
              // The viz is now ready and can be safely used.
              console.log("Run this code when the viz has finished     loading.");
        }
    };
    this.viz = new tableau.Viz(placeholderDiv, url, options);
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
