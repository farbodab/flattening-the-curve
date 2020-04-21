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

declare var tableau: any;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit, AfterViewInit {
  viz: any;
  kpiViz: any;

  cardCategories = [
    {
      header: 'Critical Care Analysis',
      category: 'Critical',
      selected: false,
    },
    {
      header: 'Regional Analysis',
      category: 'Regional',
      selected: false
    },
    {
      header: 'Testing Analysis',
      category: 'Testing',
      selected: false
    },
    {
      header: 'Capacity Analysis',
      category: 'capacity',
      selected: false
    }
  ];
  cards = [
    {
      header: 'Critical Care by Region Analysis',
      category: 'Critical',
      content: 'Approximately 5% of patients with COVID-19 require critical care. What does that look like in Ontario?',
      route: 'critical',
      thumbnail: 'https://public.tableau.com/thumb/views/CriticalCareCapacity/Dashboard1?:display_count=y&:origin=viz_share_link',
      selected: false,
      selectedCategory: false,
      selectedRow: false
    },
    {
      header: 'Capacity Analysis',
      category: 'Critical',
      content: 'When could Ontario ICU resources be depleted?',
      route: 'capacity',
      thumbnail: 'assets/img/capacity_visual.png',
      selected: false,
      selectedCategory: false,
      selectedRow: false
    },
    {
      header: 'Regional Analysis',
      category: 'Regional',
      content: 'What does COVID-19 look like in each Ontario region?',
      route: 'regional',
      thumbnail: 'https://public.tableau.com/thumb/views/OntarioCOVID-19RegionalAnalysis/Dashboard1?:display_count=y&:origin=viz_share_link',
      selected: false,
      selectedCategory: false,
      selectedRow: false
    },
    {
      header: 'Testing Analysis',
      category: 'Testing',
      content: 'Delays in test results are piling up, producing an artificial decrease in the number of confirmed cases. What does testing in Ontario look like?',
      route: 'testing',
      thumbnail: 'https://public.tableau.com/thumb/views/OntarioCOVID-19TestingAnalysis/Testing?:display_count=y&:origin=viz_share_link',
      selected: false,
      selectedCategory: false,
      selectedRow: false
    }
  ];

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

  constructor(private host_service: HostService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private api_service: ApiService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    });
    this.cardCategories[0].selected = true;
    //this.cards[0].selected = true;
    //this.selectedCategory = "Critical";
    //this.router.navigate(['/analysis/critical']);
  }

  ngAfterViewInit() {
    this.fetchVizObj();
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
      },
      error => {
        //console.error(error);
      }
    );
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
    this.setKpiViz(url, height);
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

  setKpiViz(urlInput: string, vizHeight: string) {
    const placeholderDiv = document.getElementById('kpiContainer');
    let url = '';
    if (urlInput === '') {
      url = 'https://public.tableau.com/views/KPI_15862242314660/Dashboard1?:display_count=y&:origin=viz_share_link';
    } else {
      url = urlInput;
    }

    const optionsDesktop = {
      hideTabs: true,
      width: "100%",
      height: vizHeight,
      //margin: "0 auto",
      onFirstInteractive: function () {
        // The viz is now ready and can be safely used.
        console.log("Run this code when the viz has finished loading.");
      }
    };

    const optionsMobile = {
      hideTabs: true,
      width: "100%",
      height: "2300px",
      //margin: "0 auto",
      onFirstInteractive: function () {
        // The viz is now ready and can be safely used.
        console.log("Run this code when the viz has finished loading.");
      }
    };

    if (this.is_full) {
      this.kpiViz = new tableau.Viz(placeholderDiv, url, optionsDesktop);
    } else {
      this.kpiViz = new tableau.Viz(placeholderDiv, url, optionsMobile);
    }
  }

  openDialog(componentName: any, category: string, url: string, text: string, height: number, index: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      visualName: componentName,
      textContent: text,
      vizUrl: url,
      vizCategory: category,
      vizHeight: height
    };
    dialogConfig.width = '300px';

    const dialogRef = this.dialog.open(CommonDesktopVisualComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
            this.jsonObj[index].selected = false;
            this.selectedCategory = '';
    });

    //const placeholderDiv = document.getElementById('routerOutlet');
    // if (this.selectedCategory !== category) {
    //   placeholderDiv.remove();
    // }
    //  switch (componentName) {
    //   case 'Critical Care by Region Analysis':
    //     const dialogRefCritical = this.dialog.open(AnalysisCriticalComponent, {
    //       width: '300px',
    //       data: {}
    //     });

    //     dialogRefCritical.afterClosed().subscribe(result => {
    //       this.cards[index].selected = false;
    //       this.selectedCategory = '';
    //     });
    //     break;
    //   case 'Capacity Analysis':
    //     const dialogRefCapacity = this.dialog.open(AnalysisCapacityComponent, {
    //       width: '300px',
    //       data: {}
    //     });

    //     dialogRefCapacity.afterClosed().subscribe(result => {
    //       this.cards[index].selected = false;
    //       this.selectedCategory = '';
    //     });
    //     break;
    //   case 'Regional Analysis':
    //     const dialogRefRegional = this.dialog.open(AnalysisRegionalComponent, {
    //       width: '300px',
    //       data: {}
    //     });
    //     dialogRefRegional.afterClosed().subscribe(result => {
    //       this.cards[index].selected = false;
    //       this.selectedCategory = '';
    //     });
    //     break;
    //   case 'Testing Analysis':
    //     const dialogRefTesting = this.dialog.open(AnalysisTestingComponent, {
    //       width: '300px',
    //       data: {}
    //     });

    //     dialogRefTesting.afterClosed().subscribe(result => {
    //       this.cards[index].selected = false;
    //       this.selectedCategory = '';
    //     });
    //     break;
    //   default:
    //     break;
    // }
  }

  selectedCategoryTab(index: number, category: string) {
    this.cardCategories.forEach((element) => {
      if (element.category === category) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
    this.cards.forEach((element) => {
      element.selected = false;
      if (element.category === category) {
        element.selectedCategory = true;
      } else {
        element.selectedCategory = false;
      }
    });
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