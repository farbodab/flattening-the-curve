import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { HostService } from '../../services/host.service';
import { Sort } from '@angular/material';

declare var tableau: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('MailingList', { static: false }) mailingList: ElementRef;

  graph_data = null;
  ontario: any = "Ontario";
  italy: any = "Italy";
  southkorea: any = "South Korea";
  viz: any;
  tableau: any;
  is_full = true;
  metricJsonObj: any;
  jsonObj: any;
  window_subscription: Subscription;
  initial_sort: Sort = {
    active: 'phu',
    direction: 'asc'
  };
  ontarioObj = {
    phu: null,
    rt: null,
    weekly: null,
    testing: null,
    icu: null,
    stage: null
  };

  phus = [
    {phu: 'Toronto', rt: 0.6, new: 15, testing: 0.27, testingPercentage: '27%', tracing: 0.53, tracingPercentage: '53%', icu: 0.66, icuPercentage: '66%', stage: 2},
    {phu: 'Lambton', rt: 1.2, new: 43, testing: 0.34, testingPercentage: '34%', tracing: 0.22, tracingPercentage: '22%', icu: 0.71, icuPercentage: '71%', stage: 1},
    {phu: 'Porcupine', rt: 1.4, new: 90, testing: 0.67, testingPercentage: '67%', tracing: 0.61, tracingPercentage: '61%', icu: 0.55, icuPercentage: '55%', stage: 3},
    {phu: 'Brant County', rt: 0.3, new: 56, testing: 0.15, testingPercentage: '15%', tracing: 0.37, tracingPercentage: '37%', icu: 0.73, icuPercentage: '73%', stage: 3},
    {phu: 'Refrew County', rt: 0.82, new: 22, testing: 0.83, testingPercentage: '83%', tracing: 0.46, tracingPercentage: '46%', icu: 0.41, icuPercentage: '41%', stage: 2},
  ];

  sortedMetrics: any[];

  constructor(private host_service: HostService, private api_service: ApiService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    });
    this.fetchVizObj();
  }

  ngAfterViewInit() {
    this.fetchDataObj();
  }

  fetchDataObj() {
    this.api_service.get_reopening_obj().subscribe(
      data => {
        this.metricJsonObj = data;
        this.sortedMetrics = this.removeOntartio(this.metricJsonObj.slice());
        this.sortMetrics(this.initial_sort);
        //this.initTeamForm(this.teamChoices);
        //this.teamChoicesCount = this.iterateTeam(this.jsonObj, this.teamChoices);
      },
      error => {
        this.metricJsonObj = 'error';
      }
    );
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
      var url = "https://public.tableau.com/views/Ontarios2COVID-19Curves/Dashboard?:display_count=y&:origin=viz_share_link"
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

  removeOntartio(dataObject:any) {
    return dataObject.filter((ele) => {
      if (ele.phu === 'Ontario') {
        this.ontarioObj = ele;
      }
      return ele.phu !== 'Ontario';
    });
  }

  sortMetrics(sort: Sort) {
    const metrics = this.sortedMetrics.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedMetrics = metrics;
      return;
    }

    this.sortedMetrics = metrics.sort((a, b) => {
      const isAscending = sort.direction === 'asc';

      switch (sort.active) {
        case 'phu': return this.compareData(a.phu, b.phu, 'string', isAscending);
        case 'rt': return this.compareData(a.rt, b.rt, 'number', isAscending);
        case 'new': return this.compareData(a.weekly, b.weekly, 'number', isAscending);
        case 'testing': return this.compareData(a.testing, b.testing, 'number', isAscending);
        case 'tracing': return this.compareData(a.testing, b.testing, 'number', isAscending);
        case 'icu': return this.compareData(a.icu, b.icu, 'number', isAscending);
        case 'stage': return this.compareData(a.stage, b.stage, 'number', isAscending);
        default: return 0;
      }
    });

  }

  compareData(a: number | string, b: number | string, type: string, isAscending: boolean) {

    switch(type) {
      case 'string': return (a < b ? -1 : 1) *(isAscending ? 1: -1);
      case 'number': return (((Number(a) < Number(b)) || (b === 'nan')) ? -1 : 1) *(isAscending ? 1: -1);
      default: return 0;
    }
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
