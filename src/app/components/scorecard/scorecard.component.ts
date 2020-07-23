import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { HostService } from '../../services/host.service';
import { Sort } from '@angular/material';
import { ViewportScroller } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

declare var tableau: any;

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit, AfterViewInit {

  @ViewChild('MailingList', { static: false }) mailingList: ElementRef;
  @ViewChildren('phuArray') scoreCardComponents: QueryList<any>;

  graph_data = null;
  ontario: any = "Ontario";
  italy: any = "Italy";
  southkorea: any = "South Korea";
  viz: any;
  tableau: any;
  is_full = true;
  timesObj: any;
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
    tracing: null,
    icu: null,
    stage: null
  };
  sortedMetrics: any[];
  dropdownSelection: FormGroup;

  phuArray = [
    {
        phu: 'Brant County Health Unit',
        value: 'brant_county'
    },
    {
        phu: 'Chatham-Kent Health Unit',
        value: 'chatham_kent'
    },
    {
        phu: 'City of Hamilton Health Unit',
        value: 'city_of_hamilton'
    },
    {
        phu: 'City of Ottawa Health Unit',
        value: 'city_of_ottawa'
    },
    {
        phu: 'City of Toronto Health Unit',
        value: 'city_of_toronto'
    },
    {
        phu: 'Durham Regional Health Unit',
        value: 'durham_regional'
    },
    {
        phu: 'Grey Bruce Health Unit',
        value: 'grey_bruce'
    },
    {
        phu: 'Haldimand-Norfolk Health Unit',
        value: 'haldimand_norfolk'
    },
    {
        phu: 'Haliburton, Kawartha, Pine Ridge District Health Unit',
        value: 'haliburton_kawartha_pine_ridge_district'
    },
    {
        phu: 'Halton Regional Health Unit',
        value: 'halton_regional'
    },
    {
        phu: 'Hastings and Prince Edward Counties Health Unit',
        value: 'hastings_and_prince_edward_counties'
    },
    {
        phu: 'Huron Perth County Health Unit',
        value: 'huron_perth_county'
    },
    {
        phu: 'Kingston, Frontenac, and Lennox and Addington Health Unit',
        value: 'kingston_frontenac_and_lennox_and_addington'
    },
    {
        phu: 'Lambton Health Unit',
        value: 'lambton'
    },
    {
        phu: 'Leeds, Grenville and Lanark District Health Unit',
        value: 'leeds_grenville_and_lanark_district'
    },
    {
        phu: 'Middlesex-London Health Unit',
        value: 'middlesex_london'
    },
    {
        phu: 'Niagara Regional Area Health Unit',
        value: 'niagara_regional_area'
    },
    {
        phu: 'North Bay Parry Sound District Health Unit',
        value: 'north_bay_parry_sound_district'
    },
    {
        phu: 'Northwestern Health Unit',
        value: 'northwestern'
    },
    {
        phu: 'Peel Regional Health Unit',
        value: 'peel_regional'
    },
    {
        phu: 'Peterborough County–City Health Unit',
        value: 'peterborough_county_city'
    },
    {
        phu: 'Porcupine Health Unit',
        value: 'porcupine'
    },
    {
        phu: 'Renfrew County and District Health Unit',
        value: 'renfrew_county_and_district'
    },
    {
        phu: 'Simcoe Muskoka District Health Unit',
        value: 'simcoe_muskoka_district'
    },
    {
        phu: 'Southwestern Public Health Unit',
        value: 'southwestern'
    },
    {
        phu: 'Sudbury and District Health Unit',
        value: 'sudbury_and_district'
    },
    {
        phu: 'The District of Algoma Health Unit',
        value: 'the_district_of_algoma'
    },
    {
        phu: 'The Eastern Ontario Health Unit',
        value: 'the_eastern_ontario'
    },
    {
        phu: 'Thunder Bay District Health Unit',
        value: 'thunder_bay_district'
    },
    {
        phu: 'Timiskaming Health Unit',
        value: 'timiskaming'
    },
    {
        phu: 'Waterloo Health Unit',
        value: 'waterloo'
    },
    {
        phu: 'Wellington-Dufferin-Guelph Health Unit',
        value: 'wellington_dufferin_guelph'
    },
    {
        phu: 'Windsor-Essex County Health Unit',
        value: 'windsor_essex_county'
    },
    {
        phu: 'York Regional Health Unit',
        value: 'york_regional'
    }
];

  constructor(private host_service: HostService, private formBuilder: FormBuilder, private api_service: ApiService, private scrollIntoView: ViewportScroller) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    });
    this.fetchVizObj();
    this.dropdownSelection = this.formBuilder.group({});
    this.dropdownSelection.addControl('phu', this.formBuilder.control(''));
    this.dropdownSelection.addControl('searchCtrl', this.formBuilder.control(''));
  }

  ngAfterViewInit() {
    this.fetchDataObj();
    this.fetchRefreshTimes();
  }

  fetchRefreshTimes() {
    this.api_service.get_reopeneing_times().subscribe(
      data => {
        this.timesObj = this.iterateTimes(data);
        console.log(this.timesObj);
      },
      error => {
        this.timesObj = 'error';
      }
    );
  }

  fetchDataObj() {
    this.api_service.get_reopening_obj().subscribe(
      data => {
        this.metricJsonObj = this.populateRoutes(data);
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
    //this.viz = new tableau.Viz(placeholderDiv, url, options);
  }

  iterateRoutes(phu: string) {
    let routeValue = '';

    this.phuArray.forEach(element => {
      if(element.phu === phu) {
        routeValue = element.value;
      }
    });
    return routeValue;
  }

  populateRoutes(dataObject: any) {
    let placeholderObj = [];

    dataObject.forEach(element => {
      element['route'] = this.iterateRoutes(element.phu);
      placeholderObj.push(element);
    });

    return placeholderObj;
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
        case 'tracing': return this.compareData(a.tracing, b.tracing, 'number', isAscending);
        case 'icu': return this.compareData(a.icu, b.icu, 'number', isAscending);
        case 'stage': return this.compareData(a.stage, b.stage, 'number', isAscending);
        default: return 0;
      }
    });

  }

  iterateTimes(timesObject:any) {
    let placeholder = {};
    timesObject.forEach( element => {
      placeholder[element.source] = moment(element.date_refreshed).format('MMM DD YYYY');
    });

    return placeholder;
  }

  compareData(a: number | string, b: number | string, type: string, isAscending: boolean) {
    
    switch(type) {
      case 'string': return (a < b ? -1 : 1) *(isAscending ? 1: -1);
      case 'number': return ((b === 'nan') ? -1 : (a ==='nan' ? 1 : ((((Number(a) < Number(b)) || (b === 'nan')) ? -1 : 1) *(isAscending 
        ? 1: -1))));
      default: return 0;
    }
  }

  scrollTo(elementPhu: string): void {
    setTimeout(() => {
      const index = this.phuArray.findIndex(phu => phu.phu === elementPhu);
      this.scoreCardComponents.toArray()[index].nativeElement.scrollIntoView();
    }, 100);
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
