import { Component, Input, OnInit, AfterViewInit, OnChanges } from "@angular/core";
import { ApiService } from '../../services/api.service';
import { HostService } from '../../services/host.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatTooltip } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, UrlTree, UrlSegment, UrlSegmentGroup, PRIMARY_OUTLET, DefaultUrlSerializer, RouterState, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: "app-summary",
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})

export class SummaryComponent implements OnInit {
    @Input() hr_uid: any;
    @Input() GoBack: any;
    data: any;
    epi: any;
    epi_recent: any;
    cases: any;
    icu: any;
    testing: any;
    rt: any;
    percent_positive: any;
    is_full = true;
    displayFooter: any;
    urlSegments: any;
    filteringCheckboxes: FormGroup;
    dropdownList: FormGroup;
    averageForm: FormGroup;
    window_subscription: Subscription;
    fetch_subscribe: Subscription;
    fetch_epi: Subscription;
    fetch_epi_recent: Subscription;
    mySubscription: Subscription;
    headerLabel = '';
    path = ''
    phuKeys = {
      'the_district_of_algoma':3526,
      'brant_county' : 3527,
      'durham_regional' : 3530,
      'grey_bruce' : 3533,
      'haldimand_norfolk' : 3534,
      'haliburton_kawartha_pine_ridge_district' : 3535,
      'halton_regional' : 3536,
      'city_of_hamilton' : 3537,
      'hastings_and_prince_edward_counties' : 3538,
      'huron_perth_county' : 3539,
      'chatham_kent' : 3540,
      'kingston_frontenac_and_lennox_and_addington' : 3541,
      'lambton' : 3542,
      'leeds_grenville_and_lanark_district' : 3543,
      'middlesex_london' : 3544,
      'niagara_regional_area' : 3546,
      'north_bay_parry_sound_district' : 3547,
      'northwestern' : 3549,
      'city_of_ottawa' : 3551,
      'peel_regional' : 3553,
      'peterborough_county_city' : 3555,
      'porcupine' : 3556,
      'renfrew_county_and_district' : 3557,
      'the_eastern_ontario' : 3558,
      'simcoe_muskoka_district' : 3560,
      'sudbury_and_district' : 3561,
      'thunder_bay_district' : 3562,
      'timiskaming' : 3563,
      'waterloo' : 3565,
      'wellington_dufferin_guelph' : 3566,
      'windsor_essex_county' : 3568,
      'york_regional' : 3570,
      'southwestern' : 3575,
      'city_of_toronto' : 3595,
      'ontario' : 0,
    }
    phuArray = [
        {
            phu: 'Ontario',
            value: 'ontario'
        },
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
    child_id = ''

    constructor(private host_service: HostService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private api_service: ApiService) {
      this.refresh_layout(window.innerWidth);
      this.urlSegments = this.route.snapshot['_urlSegment']
      typeof (this.urlSegments.segments[1]) === 'undefined' ? this.path = 'ontario' : this.path = this.urlSegments.segments[1].path;
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
      };

      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
    }

    ngOnInit() {
      this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      });
      this.fetchDataObj();
    }

    ngOnChanges() {
      this.ngOnDestroy()
      this.ngOnInit()
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
      if (this.window_subscription) {
          this.window_subscription.unsubscribe();
      }
      if (this.fetch_subscribe) {
        this.fetch_subscribe.unsubscribe();
      }
      if (this.fetch_epi) {
        this.fetch_epi.unsubscribe();
      }
      if (this.fetch_epi_recent) {
        this.fetch_epi_recent.unsubscribe();
      }
      if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
    }

    fetchDataObj() {
    let hr_uid = ''
    this.hr_uid ? hr_uid = this.hr_uid : hr_uid = this.path
    this.fetch_subscribe = this.api_service.get_summary_obj(hr_uid).subscribe(
      (data: Array<any>) => {
        this.data = data;
        this.cases = data.filter(date => date["rolling_pop"] != null)
        this.cases = this.cases[this.cases.length - 1]
        this.icu = data.filter(date => date["critical_care_pct"] != null)
        this.icu = this.icu[this.icu.length - 1]
        this.testing = data.filter(date => date["rolling_test_twenty_four"] != null)
        this.testing = this.testing[this.testing.length - 1]
        this.rt = data.filter(date => date["rt_ml"] != null)
        this.rt = this.rt[this.rt.length - 1]
        this.percent_positive = data.filter(date => date["% Positivity"] != null)
        this.percent_positive = this.percent_positive[this.percent_positive.length - 1]
        this.displayFooter = true;
      },
      error => {
        this.data = 'error';
      }
    );
  }

    routeonSelection(route: string) {
      const index = this.phuArray.findIndex(phu => phu.value === route);
       this.headerLabel = this.phuArray[index].phu;
       this.fetch_subscribe.unsubscribe();
       this.router.navigate(['/summary/' + route])
    }

    changeView(view: string, controlName: string) {
      this.averageForm.controls[controlName].setValue(view);
    }

    top (){
      window.scroll(0,0);
    }

  private refresh_layout(width) {
  this.is_full = window.innerWidth >= 1024 ? true : false;
  }

}
