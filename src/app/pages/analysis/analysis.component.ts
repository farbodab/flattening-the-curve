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
    vizArray = [
        {
            viz: 'capacity',
            value: 'Capacity Analysis'
        },

        {
            viz: 'critical_care',
            value: 'Critical Care Trends'
        }
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

  ngAfterViewInit() {
  var viz_obj = [];
    this.fetchVizObj();
     console.log(viz_obj);
    
    
    
  }


  ngOnDestroy() {
    if (this.window_subscription) {
      this.window_subscription.unsubscribe();
    }
  }

  fetchVizObj() {
    this.api_service.get_viz_obj().subscribe(
      data => {
        this.jsonObj = data;
        this.jsonObj = this.addSelectedProperty(this.jsonObj);
        this.findKpiViz(this.jsonObj);
        this.iterateCategories(this.jsonObj);
        this.initFilteringForm(this.categoryList);

        //store viz array
        var viz_obj = this.jsonObj.slice();
        console.log(viz_obj);

        //inital_url is the url the analysis page is accessed with
    var initial_url = this.router.url;

    //grab url after the last slash, to id the modal from viz array that needs to open
    var modal_url = '';

    if (initial_url !== '/analysis'){
      modal_url = /[^/]*$/.exec(initial_url)[0]; 
      this.getModalViz(modal_url);
    }
      }

    );
    
  }

  getModalViz(modal_url: string) {
    //get viz header from viz array for db look-up
    var viz_header = this.vizArray.find(x=>x.viz === modal_url).value;
    console.log(viz_header);
    var viz_modal = [];

    console.log(this.jsonObj);

    this.jsonObj.forEach((element) => {
      if (element.header === viz_header) {
        viz_modal = element.content;

        console.log(element.text_top);
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
    //const placeholderDiv = document.getElementById('routerOutlet');
    //if (this.selectedCategory !== category) {
    //  placeholderDiv.remove();
    //}
    //this.router.navigate(['/analysis/' + route]);

   // const index = this.vizArray.findIndex(viz => viz.value === route);
   // this.headerLabel = this.vizArray[index].viz;

    //const selectedurl = this.vizArray.findIndex(viz => viz.value === route);

    var slug = this.vizArray.find(x=>x.value === route).viz;

    this.router.navigate(['/analysis/' + slug]);
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
