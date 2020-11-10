import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { HostService } from '../../services/host.service';
import { Sort } from '@angular/material';
import { ViewportScroller } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

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
  metric_collapse: boolean = true;
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
    percent_positive: null,
    tracing: null,
    icu: null,
    stage: null
  };
  sortedMetrics: any[];
  dropdownSelection: FormGroup;
  myControl = new FormControl();
  phuArray = [
    {
        phu: 'Brant County Health Unit',
        value: 'brant_county',
        id: 3527,
    },
    {
        phu: 'Chatham-Kent Health Unit',
        value: 'chatham_kent',
        id: 3540,
    },
    {
        phu: 'City of Hamilton Health Unit',
        value: 'city_of_hamilton',
        id: 3537,
    },
    {
        phu: 'City of Ottawa Health Unit',
        value: 'city_of_ottawa',
        id: 3551,
    },
    {
        phu: 'City of Toronto Health Unit',
        value: 'city_of_toronto',
        id: 3595,
    },
    {
        phu: 'Durham Regional Health Unit',
        value: 'durham_regional',
        id: 3530,
    },
    {
        phu: 'Grey Bruce Health Unit',
        value: 'grey_bruce',
        id: 3533,
    },
    {
        phu: 'Haldimand-Norfolk Health Unit',
        value: 'haldimand_norfolk',
        id: 3534
    },
    {
        phu: 'Haliburton, Kawartha, Pine Ridge District Health Unit',
        value: 'haliburton_kawartha_pine_ridge_district'
    },
    {
        phu: 'Halton Regional Health Unit',
        value: 'halton_regional',
        id: 3536
    },
    {
        phu: 'Hastings and Prince Edward Counties Health Unit',
        value: 'hastings_and_prince_edward_counties',
        id: 3538
    },
    {
        phu: 'Huron Perth County Health Unit',
        value: 'huron_perth_county',
        id: 3539
    },
    {
        phu: 'Kingston, Frontenac, and Lennox and Addington Health Unit',
        value: 'kingston_frontenac_and_lennox_and_addington',
        id: 3541
    },
    {
        phu: 'Lambton Health Unit',
        value: 'lambton',
        id: 3542
    },
    {
        phu: 'Leeds, Grenville and Lanark District Health Unit',
        value: 'leeds_grenville_and_lanark_district',
        id: 3543
    },
    {
        phu: 'Middlesex-London Health Unit',
        value: 'middlesex_london',
        id: 3544
    },
    {
        phu: 'Niagara Regional Area Health Unit',
        value: 'niagara_regional_area',
        id: 3546
    },
    {
        phu: 'North Bay Parry Sound District Health Unit',
        value: 'north_bay_parry_sound_district',
        id: 3547
    },
    {
        phu: 'Northwestern Health Unit',
        value: 'northwestern',
        id: 3549
    },
    {
        phu: 'Peel Regional Health Unit',
        value: 'peel_regional',
        id: 3553
    },
    {
        phu: 'Peterborough County–City Health Unit',
        value: 'peterborough_county_city',
        id: 3555
    },
    {
        phu: 'Porcupine Health Unit',
        value: 'porcupine',
        id: 3556
    },
    {
        phu: 'Renfrew County and District Health Unit',
        value: 'renfrew_county_and_district',
        id: 3557,
    },
    {
        phu: 'Simcoe Muskoka District Health Unit',
        value: 'simcoe_muskoka_district',
        id: 3560
    },
    {
        phu: 'Southwestern Public Health Unit',
        value: 'southwestern',
        id: 3575
    },
    {
        phu: 'Sudbury and District Health Unit',
        value: 'sudbury_and_district',
        id: 3561
    },
    {
        phu: 'The District of Algoma Health Unit',
        value: 'the_district_of_algoma',
        id: 3526
    },
    {
        phu: 'The Eastern Ontario Health Unit',
        value: 'the_eastern_ontario',
        id: 3558
    },
    {
        phu: 'Thunder Bay District Health Unit',
        value: 'thunder_bay_district',
        id: 3562
    },
    {
        phu: 'Timiskaming Health Unit',
        value: 'timiskaming',
        id: 3563
    },
    {
        phu: 'Waterloo Health Unit',
        value: 'waterloo',
        id: 3565
    },
    {
        phu: 'Wellington-Dufferin-Guelph Health Unit',
        value: 'wellington_dufferin_guelph',
        id: 3566
    },
    {
        phu: 'Windsor-Essex County Health Unit',
        value: 'windsor_essex_county',
        id: 3568
    },
    {
        phu: 'York Regional Health Unit',
        value: 'york_regional',
        id: 3570
    }
];
  selectedObject = [3595];
  selectedPHU = null;
  phuSelected = false;
  cookieValue: string;

  constructor(private host_service: HostService, private formBuilder: FormBuilder, private api_service: ApiService, private scrollIntoView: ViewportScroller, private cookieService: CookieService) {
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

    if (this.cookieService.get('myregions')){
      this.selectedObject = this.cookieService.get('myregions').split(",").map((i) => Number(i));
    }
    console.log(this.selectedObject)

  }

  ngAfterViewInit() {
    this.fetchDataObj();
    this.fetchRefreshTimes();
  }

  onClickMe() {
  this.metric_collapse = !this.metric_collapse;
  }

  Checked(event, HR_UID) {
    if (event) {
      this.selectedObject.push(HR_UID)
    }
    else {
      this.selectedObject = this.selectedObject.filter(item => item !== HR_UID)
    }
    this.cookieService.set('myregions', this.selectedObject.toString())
  }

  ShowData(HR_UID){
    if (this.phuSelected && this.selectedPHU == HR_UID) {
      this.phuSelected = !this.phuSelected
      this.selectedPHU = null
    }
    else if (this.phuSelected && this.selectedPHU != HR_UID) {
      this.selectedPHU = HR_UID
    }
    else {
      this.phuSelected = !this.phuSelected
      this.selectedPHU = HR_UID
    }
    console.log(HR_UID)
    console.log(this.selectedPHU)

  }

  GoBack(){
    this.phuSelected = false
    this.selectedPHU = null
    console.log('triggered')
  }

  Removed(HR_UID){
    this.selectedObject = this.selectedObject.filter(item => item !== HR_UID)
    this.cookieService.set('myregions', this.selectedObject.toString())
  }

  Selected(HR_UID){
    return this.selectedObject.includes(HR_UID);
  }

  filterItemsOfType(sortedMetrics){
    return sortedMetrics.filter(item => this.selectedObject.includes(item.HR_UID))
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
    this.api_service.get_summary_obj(-1).subscribe(
      data => {
        console.log(data)
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

  iterateRoutes(phu: number) {
    let routeValue = '';

    this.phuArray.forEach(element => {
      if(element.id == phu) {
        routeValue = element.value;
      }
    });
    return routeValue;
  }

  populateRoutes(dataObject: any) {
    let placeholderObj = [];

    dataObject.forEach(element => {
      element['route'] = this.iterateRoutes(element.HR_UID);
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
        case 'rt': return this.compareData(a.rt_ml, b.rt_ml, 'number', isAscending);
        case 'new': return this.compareData(a.rolling_pop, b.rolling_pop, 'number', isAscending);
        case 'testing': return this.compareData(a.rolling_test_twenty_four, b.rolling_test_twenty_four, 'number', isAscending);
        case 'percent_positive': return this.compareData(a.percent_positive, b.percent_positive, 'number', isAscending);
        case 'icu': return this.compareData(a.critical_care_pct, b.critical_care_pct, 'number', isAscending);
        case 'risk': return this.compareData(a.rolling_pop, b.rolling_pop, 'number', isAscending);
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
