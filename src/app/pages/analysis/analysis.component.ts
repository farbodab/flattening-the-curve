import { Component, OnInit, Inject } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnalysisCriticalComponent } from './analysis.critical.component';
import { AnalysisRegionalComponent } from './analysis.regional.component';
import { AnalysisTestingComponent } from './analysis.testing.component';
import { AnalysisCapacityComponent } from './analysis.capacity.component';

declare var tableau: any;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit {
  viz: any;
  kpiViz: any;

  cardCategories = [
    {
      header: 'Critical Care Analysis',
      category: 'critical',
      selected: false,
    },
    {
      header: 'Regional Analysis',
      category: 'regional',
      selected: false
    },
    {
      header: 'Testing Analysis',
      category: 'testing',
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
      header: 'Critical Care Analysis',
      category: 'Critical',
      content: 'Approximately 5% of patients with COVID-19 require critical care.',
      route: 'critical',
      thumbnail: 'https://public.tableau.com/thumb/views/CriticalCareCapacity/Dashboard1?:display_count=y&:origin=viz_share_link',
      selected: false,
      selectedCategory: false,
      selectedRow: false
    },
    {
      header: 'Capacity Analysis',
      category: 'Critical',
      content: 'This is a compartment model to predict the time Ontario ICU resources will be depleted under undesirable (Italy) and better scenarios.',
      route: 'capacity',
      thumbnail: 'assets/img/capacity_visual_thumbnail.png',
      selected: false,
      selectedCategory: false,
      selectedRow: false
    },
    {
      header: 'Regional Analysis',
      category: 'Regional',
      content: 'Our interactive map provides an analysis of cases across regions in Ontario.',
      route: 'regional',
      thumbnail: 'https://public.tableau.com/thumb/views/OntarioCOVID-19RegionalAnalysis/Dashboard1?:display_count=y&:origin=viz_share_link',
      selected: false,
      selectedCategory: false,
      selectedRow: false
    },
    {
      header: 'Testing Analysis',
      category: 'Testing',
      content: 'Our analysis shows that delays in test results are piling up, producing an artificial decrease in the number of confirmed cases',
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

  constructor(private host_service: HostService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog) {
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
    const placeholderDiv = document.getElementById('kpiContainer');
    const url="https://public.tableau.com/views/KPI_15862242314660/at-a-glance?:display_count=y&:origin=viz_share_link";
    const options = {
      hideTabs: true,
      width: "100%",
      height: "650px",
      onFirstInteractive: function () {
        // The viz is now ready and can be safely used.
        console.log("Run this code when the viz has finished loading.");
      }

    };
    this.kpiViz = new tableau.Viz(placeholderDiv, url, options);
    this.initFilteringForm();
  }

  ngOnDestroy() {
    if (this.window_subscription) {
      this.window_subscription.unsubscribe();
    }
  }

  openDialog(componentName: any, category: string, index: number): void {
    const placeholderDiv = document.getElementById('routerOutlet');
    if (this.selectedCategory !== category) {
      placeholderDiv.remove();
    }
    switch (componentName) {
      case 'Critical Care Analysis':
        const dialogRefCritical = this.dialog.open(AnalysisCriticalComponent, {
          width: '300px',
          data: {}
        });

        dialogRefCritical.afterClosed().subscribe(result => {
          this.cards[index].selected = false;
          this.selectedCategory = '';
        });
        break;
      case 'Capacity Analysis':
        const dialogRefCapacity = this.dialog.open(AnalysisCapacityComponent, {
          width: '300px',
          data: {}
        });

        dialogRefCapacity.afterClosed().subscribe(result => {
          this.cards[index].selected = false;
          this.selectedCategory = '';
        });
        break;
      case 'Regional Analysis':
        const dialogRefRegional = this.dialog.open(AnalysisRegionalComponent, {
          width: '300px',
          data: {}
        });
        dialogRefRegional.afterClosed().subscribe(result => {
          this.cards[index].selected = false;
          this.selectedCategory = '';
        });
        break;
      case 'Testing Analysis':
        const dialogRefTesting = this.dialog.open(AnalysisTestingComponent, {
          width: '300px',
          data: {}
        });

        dialogRefTesting.afterClosed().subscribe(result => {
          this.cards[index].selected = false;
          this.selectedCategory = '';
        });
        break;
      default:
        break;
    }
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
      console.log('here');
      // event.stopPropagation();
      // this.router.navigate(['/analysis']);
    }
    this.cards.forEach((element) => {
      if (element.header === header) {
        element.selected = !element.selected;
        this.selectedCategory = element.category;
      } else {
        element.selected = false;
      }
    });
  }

  initFilteringForm() {
    this.filteringCheckboxes = this.formBuilder.group({
      Critical: true,
      Regional: true,
      Testing: true,
      Capacity: true
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