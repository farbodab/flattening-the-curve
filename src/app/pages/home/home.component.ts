import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var tableau: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  graph_data = null;
  ontario: any = "Ontario";
  italy: any = "Italy";
  southkorea: any = "South Korea";
  viz: any;
  tableau: any;
  is_full = true;

  constructor(private api_service: ApiService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {

    var placeholderDiv = document.getElementById('vizContainer');
    var url = "https://public.tableau.com/views/OntarioICUCapacity2forCOVID-19/Dashboard1?:display_count=y&:origin=viz_share_link"

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

  on_read_more_pressed() {
    window.location.href = 'https://medium.com/@obenfine/howsmyflattening-choosing-ontarios-covid-19-curve-5c173d4f32d';
  }

  on_sign_up_pressed() {
    window.location.href = 'https://www.surveymonkey.com/r/Y7X86JL';
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
