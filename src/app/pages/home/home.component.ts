import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { HostService } from '../../services/host.service';

declare var tableau: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('MailingList', { static: false }) mailingList: ElementRef;

  graph_data = null;
  ontario: any = "Ontario";
  italy: any = "Italy";
  southkorea: any = "South Korea";
  viz: any;
  tableau: any;
  is_full = true;
  jsonObj: any;
  window_subscription: Subscription;

  constructor(private host_service: HostService, private api_service: ApiService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    });
    this.fetchVizObj();
  }

  on_read_more_pressed() {
    window.location.href = 'https://medium.com/@obenfine/howsmyflattening-choosing-ontarios-covid-19-curve-5c173d4f32d';
  }

  on_sign_up_pressed() {
    //document.getElementById('mailingList').click();
    this.mailingList.nativeElement.click();
  }

  fetchVizObj() {
    this.api_service.get_viz_obj().subscribe(
      data => {
        console.log(data);
        this.jsonObj = data;
        this.findHomeViz(this.jsonObj);
      },
      error => {
        //console.error(error);
      }
    );
  }

  findHomeViz(obj: []) {
    let url = '';
    obj.forEach((element, index) => {
      if (element['category'] === 'home') {
        url = element['viz'];
      }
    });
    this.setHomeViz(url);
  }

  setHomeViz(urlInput: string) {
    var placeholderDiv = document.getElementById('vizContainer');
    if (urlInput === '') {
      var url = "https://public.tableau.com/views/NewCOVID-19CasesinOntario/Dashboard?:display_count=y&:origin=viz_share_link"
    } else {
      //var url = "https://public.tableau.com/views/OntarioICUCapacity2forCOVID-19/Dashboard1?:display_count=y&:origin=viz_share_link"
      var url = urlInput;
    }

    var options = {
      hideTabs: true,
      margin: "0 auto",
      onFirstInteractive: function () {
        // The viz is now ready and can be safely used.
        console.log("Run this code when the viz has finished loading.");
      }
    }
    this.viz = new tableau.Viz(placeholderDiv, url, options);
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
