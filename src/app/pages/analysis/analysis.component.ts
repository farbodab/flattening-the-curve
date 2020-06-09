import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AnalysisCriticalComponent } from './analysis.critical.component';
import { AnalysisRegionalComponent } from './analysis.regional.component';
import { AnalysisTestingComponent } from './analysis.testing.component';
import { AnalysisCapacityComponent } from './analysis.capacity.component';
import { ApiService } from 'src/app/services/api.service';
import { CommonDesktopVisualComponent } from '../../components/common-desktop-visual/common-desktop-visual.component';
import { Moment } from 'moment';
import * as moment from 'moment';

declare var tableau: any;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit, AfterViewInit {
  viz: any;
  kpiViz: any;

  categoryList = [
    'Critical',
    'Regional',
    'Testing',
  ];

  window_subscription: Subscription;
  is_full: boolean = true;
  filteringCheckboxes: FormGroup;
  selectedCategory = '';
  jsonObj: any;
  todaysDate: Moment;
  moment: any = moment;
  newToggle = true;

  urlSegments: any;
    path: string;
    //array to group analysis url (viz) with analysis modal (value).
    vizArray = [
        {
            viz: 'capacity',
            value: 'Capacity Analysis'
        },

        {
            viz: 'critical_care',
            value: 'Critical Care Trends'
        },

        {
            viz: 'critical_care_by_region',
            value: 'Critical Care by Region Analysis'
        },

        {
            viz: 'hospitalization',
            value: 'Hospitalization Analysis'
        },

        {
            viz: 'cases_by_age_and_setting',
            value: '7-Day Moving Average of Cases by Age Group and Setting'
        },

        {
            viz: 'cases_by_setting',
            value: 'Daily New Cases By Setting'
        },
        
        {
            viz: 'reproductive_number',
            value: 'Estimation of the Time-Varying Reproductive Number from Case Counts'
        },

        {
            viz: 'sources_of_infection',
            value: 'Likely Sources of Infection Over Time'
        },

        {
            viz: 'apple_mobility',
            value: 'Apple Mobility'
        },

        {
            viz: 'google_mobility',
            value: 'Google Mobility'
        },

        {
            viz: 'forecasted_cases',
            value: 'Forecasted Cases'
        },

        {
            viz: 'transmission_and_mitigation',
            value: 'Mathematical modelling of COVID-19 transmission and mitigation strategies'
        },

        {
            viz: 'regional',
            value: 'Regional Analysis'
        },

        {
            viz: 'socioeconomic',
            value: 'Socioeconomic Analysis'
        },
        
        {
            viz: 'socioeconomic_trends',
            value: 'Socioeconomic Trends'
        },

        {
            viz: 'testing_rate',
            value: 'Testing Rate Analysis'
        },

        {
            viz: 'canadian',
            value: 'Canadian Analysis'
        },
        
        {
            viz: 'death',
            value: 'Death Comparison'
        },

        {
            viz: 'international',
            value: 'International Analysis'
        },

    ];

  constructor(private host_service: HostService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private api_service: ApiService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.todaysDate = moment(new Date());
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    });

  }

  //Populate page with analysis cards
  ngAfterViewInit() {
    this.fetchVizObj();
  }


  ngOnDestroy() {
    if (this.window_subscription) {
      this.window_subscription.unsubscribe();
    }
  }

  fetchVizObj() {
    //Fetch all analysis objects 
    this.api_service.get_viz_obj().subscribe(
      data => {
        this.jsonObj = data;
        this.jsonObj = this.addSelectedProperty(this.jsonObj);
        this.findKpiViz(this.jsonObj);
        this.iterateCategories(this.jsonObj);
        this.initFilteringForm(this.categoryList);

        //inital_url is the url the analysis page is accessed with
        var initial_url = this.router.url;

        //grab url after the last slash, to id the modal from viz array that needs to open
        var modal_url = '';

        //If url is for a specific analysis, open the modal
        if (initial_url !== '/analysis'){
          //strip url of slashes
          modal_url = /[^/]*$/.exec(initial_url)[0]; 
          this.getModalViz(modal_url);
        }
      }

    );
    
  }

  getModalViz(modal_url: string) {
    //get viz header from viz array for db look-up
    var viz_header = this.vizArray.find(x=>x.viz === modal_url).value;

    //find analysis object indicated by url by matching header
    this.jsonObj.forEach((element) => {
      if (element.header === viz_header) {
        //open modal
        this.selectedVisualTab(element.header, true, 0, 0); 
        this.openDialog(element.header, element.category, element.viz_type, element.viz, element.text_top, element.text_bottom, element.desktopHeight, 0); 
      } 
      
    });
    
  }

  addSelectedProperty(obj: []) {
    return obj.map(x => Object.assign({selected: false}, x));
  }

  findKpiViz(obj: []) {
    let url = '';
    let height = '';
    obj.forEach((element, index) => {
      if (element['category'] === 'Kpi-dash') {
        url = element['viz'];
        height = element['desktopHeight'];
      }
    });
  }

  iterateCategories(obj: []) {
    let placeholderArray = [];
    obj.forEach((element, index) => {
      if (!placeholderArray.includes(element['category']) && element['category'] !== ('Kpi-dash') && element['category'] !== ('Home')) {
        placeholderArray.push(element['category']);
      }
    });
    this.categoryList = placeholderArray;
  }

  openDialog(componentName: any, category: string, type: string, url: string, topText: string, bottomText: string, height: number, index: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      visualName: componentName,
      topTextContent: topText,
      bottomTextContent: bottomText,
      vizUrl: url,
      vizCategory: category,
      vizHeight: height,
      vizType: type
    };

    dialogConfig.width = '300px';

    const dialogRef = this.dialog.open(CommonDesktopVisualComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
            this.jsonObj[index].selected = false;
            this.selectedCategory = '';
            //When modal is closed, reroute url to root analysis page
            this.router.navigate(['/analysis']);
    });
  }

  toggleNewAnalysis(bool: boolean) {
    this.newToggle = bool;
  }

  selectedVisualTab(header: string, selected: boolean, event: any, index: number) {
    if (selected) {
      this.selectedCategory = '';
    }

    // this.jsonObj = this.jsonObj.map(element => {
    //   if(element.header === header) {
    //     element = {
    //       category: element.category,
    //       content: element.content,
    //       header: element.header,
    //       text: element.text,
    //       thumbnail: element.thumbnail,
    //       viz: element.viz,
    //       selected: !element.selected
    //     };
    //     !selected ? this.selectedCategory = element.category : this.selectedCategory = '';
    //   } else {
    //     element = {
    //       category: element.category,
    //       content: element.content,
    //       header: element.header,
    //       text: element.text,
    //       thumbnail: element.thumbnail,
    //       viz: element.viz,
    //       selected: false
    //     };
    //   }
    // });

    this.jsonObj.forEach((element) => {
      if (element.header === header) {
        element.selected = !element.selected;
        !selected ? this.selectedCategory = element.category : this.selectedCategory = '';
      } else {
        element.selected = false;
      }
    });

  }

  initFilteringForm(obj: string[]) {
    this.filteringCheckboxes = this.formBuilder.group({
      // Critical: true,
      // Regional: true,
      // Testing: true,
      // Growth: true
    });
    obj.forEach(element => {
      this.filteringCheckboxes.addControl(element, this.formBuilder.control(true));
    });
  }

  routeonSelection(route: string) {
    //find url extension for selected analysis
    var slug = this.vizArray.find(x=>x.value === route).viz;

    //reroute to analysis url
    this.router.navigate(['/analysis/' + slug]);
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
