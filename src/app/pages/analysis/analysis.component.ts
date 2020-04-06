import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit {
  viz: any;

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
      category: 'critical',
      content: 'Approximately 5% of patients with COVID-19 require critical care.',
      route: './critical',
      thumbnail: 'https://public.tableau.com/thumb/views/CriticalCareCapacity/Dashboard1?:display_count=y&:origin=viz_share_link',
      selected: false,
      selectedCategory: false
    },
    {
      header: 'Regional Analysis',
      category: 'regional',
      content: 'Our interactive map provides an analysis of cases across regions in Ontario.',
      route: './regional',
      thumbnail: 'https://public.tableau.com/thumb/views/OntarioCOVID-19RegionalAnalysis/Dashboard1?:display_count=y&:origin=viz_share_link',
      selected: false,
      selectedCategory: false
    },
    {
      header: 'Testing Analysis',
      category: 'testing',
      content: 'Our analysis shows that delays in test results are piling up, producing an artificial decrease in the number of confirmed cases',
      route: './testing',
      thumbnail: 'https://public.tableau.com/thumb/views/OntarioCOVID-19TestingAnalysis/Testing?:display_count=y&:origin=viz_share_link',
      selected: false,
      selectedCategory: false
    },
    {
      header: 'Capacity Analysis',
      category: 'capacity',
      content: 'This is a compartment model to predict the time Ontario ICU resources will be depleted under undesirable (Italy) and better scenarios.',
      route: './capacity',
      thumbnail: 'https://public.tableau.com/thumb/views/OntarioCOVID-19TestingAnalysis/Testing?:display_count=y&:origin=viz_share_link',
      selected: false,
      selectedCategory: false
    }
  ];

  window_subscription: Subscription;
  is_full: boolean = true;

  constructor(private host_service: HostService) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    });
    this.cardCategories[0].selected = true;
    this.cards.forEach((element) => {
      if(element.category === this.cardCategories[0].category) {
        element.selectedCategory = true;
      }
    })
  }

  ngOnDestroy() {
    if (this.window_subscription) {
      this.window_subscription.unsubscribe();
    }
  }

  selectedCategoryTab(index: number, category: string) {
    this.cardCategories.forEach((element) => {
      if(element.category === category) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
    this.cards.forEach((element) => {
      element.selected = false;
      if(element.category === category) {
        element.selectedCategory = true;
      } else {
        element.selectedCategory = false;
      }
    });
  }

  selectedVisualTab(header: string) {
    this.cards.forEach((element) => {
      if(element.header === header) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}