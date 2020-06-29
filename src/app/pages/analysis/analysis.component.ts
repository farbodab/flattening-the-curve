import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalysisCriticalComponent } from './analysis.critical.component';
import { AnalysisRegionalComponent } from './analysis.regional.component';
import { AnalysisTestingComponent } from './analysis.testing.component';
import { AnalysisCapacityComponent } from './analysis.capacity.component';
import { ApiService } from 'src/app/services/api.service';
import { CommonDesktopVisualComponent } from '../../components/common-desktop-visual/common-desktop-visual.component';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Location } from '@angular/common';

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
  triggerDirectPopup: any[];
  newVizTracker = false;

  constructor(private host_service: HostService, private location: Location, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private api_service: ApiService, private _snackBar: MatSnackBar) {
    this.refresh_layout(window.innerWidth);
    this.urlSegments = route.snapshot['_urlSegment'];
  }

  ngOnInit() {
    this.todaysDate = moment(new Date());
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    });
    typeof (this.urlSegments.segments[1]) === 'undefined' ? this.path = '' : this.path = this.urlSegments.segments[1].path;
  }

  ngAfterViewInit() {
    //populate analysis page with cards
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
        //open pop-up, else trigger page not found notice + redirect
        if (typeof (this.triggerDirectPopup) !== 'undefined' && this.triggerDirectPopup[0] !== '') {
          if (this.is_full) {
            this.selectedVisualTab(this.triggerDirectPopup[1].header, false, 0, 0);
            this.openDialog(this.triggerDirectPopup[1].header, this.triggerDirectPopup[1].category, this.triggerDirectPopup[1].viz_type, this.triggerDirectPopup[1].viz, this.triggerDirectPopup[1].text_top, this.triggerDirectPopup[1].text_bottom, this.triggerDirectPopup[1].desktopHeight, 0);
          }
        } else if (this.path !== '') {
          this._snackBar.open('Analysis not found -- taking you back to the Analysis Page', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.router.navigate(['/analysis']);
        }
      },
      error => {
        //console.error(error);
      }
    );
  }

  addSelectedProperty(obj: []) {
    return obj.map(x => Object.assign({ selected: false }, x));
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

  iterateCategories(obj: any) {
    let placeholderArray = [];
    let indexFound: number;
    let found = false;
    //generate dynamic urls for each pop-up from analysis header
    obj.forEach((element, index) => {
      let header: any;
      header = element['header'];
      if(moment.duration(this.todaysDate.diff(element.date)).asDays() < 8) {
        this.newVizTracker = true;
      }
      if (this.path !== '' && this.path === header.toLowerCase().split(' ').join('_')) {
        this.triggerDirectPopup = [this.path, element];
        found = true;
        indexFound = index;
      }
      if (!placeholderArray.includes(element['category']) && element['category'] !== ('Kpi-dash') && element['category'] !== ('Home')) {
        placeholderArray.push(element['category']);
      }
    });
    if (found) {
      obj[indexFound].selected = true;
    }
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
    dialogRef.afterOpened().subscribe(result => {
      if (typeof (this.triggerDirectPopup) === 'undefined' || this.triggerDirectPopup[0] === '') {
        this.router.navigate(['/analysis/' + componentName.toLowerCase().split(' ').join('_')]);
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.jsonObj[index].selected = false;
      this.selectedCategory = '';
      if (typeof (this.triggerDirectPopup) !== 'undefined') {
        this.triggerDirectPopup[0] = '';
      }
      this.router.navigate(['/analysis']);
    });
  }

  toggleNewAnalysis(bool: boolean) {
    this.newToggle = bool;
  }

  selectedVisualTab(header: string, selected: boolean, event: any, index: number) {
    if (selected) {
      this.selectedCategory = '';
      this.router.navigate(['/analysis']);
    } else {
      //generate dynamic url from analysis heading
      this.router.navigate(['/analysis/' + header.toLowerCase().split(' ').join('_')]);
    }

    this.jsonObj.forEach((element) => {
      if (element.header === header) {
        element.selected = !element.selected;
        !selected ? this.selectedCategory = element.category : this.selectedCategory = '';
      } else {
        element.selected = false;
      }
      if (element.selected) {
        console.log(element.header + ' ' + element.selected);
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

  routeLink(route: string, category: string) {
    const placeholderDiv = document.getElementById('routerOutlet');
    if (this.selectedCategory !== category) {
      placeholderDiv.remove();
    }
    this.router.navigate(['/analysis/' + route]);
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
