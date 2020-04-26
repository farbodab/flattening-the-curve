import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, UrlTree, UrlSegment, UrlSegmentGroup, PRIMARY_OUTLET, DefaultUrlSerializer, RouterState, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { CommonDesktopVisualComponent } from '../../components/common-desktop-visual/common-desktop-visual.component';
import { DomSanitizer } from '@angular/platform-browser';

declare var tableau: any;

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})


export class GridComponent implements OnInit, AfterViewInit {
    viz: any;
    kpiViz: any;

    window_subscription: Subscription;
    is_full: boolean = true;
    filteringCheckboxes: FormGroup;
    dropdownList: FormGroup;
    selectedCategory = '';
    jsonObj: any;
    categoryList = [];
    gridList = [];

    searchCtrl: string;

    urlSegments: any;
    path: string;
    phuArray = [
        {
            phu: 'The District of Algoma Health Unit',
            value: 'the_district_of_algoma'
        },
        {
            phu: 'Brant County Health Unit',
            value: 'brant_county'
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
            phu: 'City of Hamilton Health Unit',
            value: 'city_of_hamilton'
        },
        {
            phu: 'Hastings and Prince Edward Counties Health Unit',
            value: 'hastings_and_prince_edward_counties'
        },
        {
            phu: 'Huron County Health Unit',
            value: 'huron_county'
        },
        {
            phu: 'Chatham-Kent Health Unit',
            value: 'chatham_kent'
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
            phu: 'City of Ottawa Health Unit',
            value: 'city_of_ottawa'
        },
        {
            phu: 'Peel Regional Health Unit’',
            value: 'peel_regional'
        },
        {
            phu: 'Perth District Health Unit',
            value: 'perth_district'
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
            phu: 'The Eastern Ontario Health Unit',
            value: 'the_eastern_ontario'
        },
        {
            phu: 'Simcoe Muskoka District Health Unit',
            value: 'simcoe_muskoka_district'
        },
        {
            phu: 'Sudbury and District Health Unit',
            value: 'sudbury_and_district'
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
            phu: 'Windsor-Essex County Health Unit’',
            value: 'windsor_essex_county'
        },
        {
            phu: 'York Regional Health Unit',
            value: 'york_regional'
        },
        {
            phu: 'Southwestern Public Health Unit',
            value: 'southwestern'
        },
        {
            phu: 'City of Toronto Health Unit',
            value: 'city_of_toronto'
        }
    ];

    constructor(private host_service: HostService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private api_service: ApiService, private sanitizer: DomSanitizer) {
        this.refresh_layout(window.innerWidth);
        this.urlSegments = route.snapshot['_urlSegment'];
    }

    ngOnInit() {
        this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
            this.refresh_layout(window.innerWidth);
        });
        typeof (this.urlSegments.segments[1]) === 'undefined' ? this.path = '' : this.path = this.urlSegments.segments[1].path;
        console.log(this.path);
    }

    ngAfterViewInit() {
        this.fetchVizObj();
    }

    ngOnDestroy() {
        if (this.window_subscription) {
            this.window_subscription.unsubscribe();
        }
    }

    // test() {
    //     console.log(this.dropdownList.controls.phu.value);
    // }

    fetchVizObj() {
        this.api_service.get_plot_obj().subscribe(
            data => {
                this.jsonObj = data;
                this.jsonObj = this.addSelectedProperty(this.jsonObj);
                this.jsonObj = this.addHeaderNoSpaces(this.jsonObj);
                this.findKpiViz(this.jsonObj);
                this.iterateCategories(this.jsonObj);
                this.gridList = this.restructureObj(this.jsonObj, this.categoryList);
                this.initFilteringForm(this.gridList);
                this.initDropdownForm(this.phuArray);
                //this.setVisuals(this.jsonObj);
            },
            error => {
                //console.error(error);
            }
        );
    }

    addSelectedProperty(obj: []) {
        return obj.map(x => Object.assign({ selected: false }, x));
    }

    addHeaderNoSpaces(obj: any) {
        return obj.map(x => Object.assign({ headerNoSpace: x['header'].replace(/\s/g, '') }, x));
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
        //this.setKpiViz(url, height);
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

    restructureObj(obj: any, categoryList: any[]) {
        let objPlaceholder = [];
        categoryList.forEach(element => {
            let placeholderArray = [];
            this.phuArray.forEach(phu => {
                let placeholderPhuArray = [];
                obj.forEach(item => {
                    if (item.category === element && (item.phu === phu.value)) {
                        placeholderPhuArray.push(item);
                    }
                });
                placeholderArray.push({
                    [phu.value]: placeholderPhuArray
                });
            });
            objPlaceholder.push({
                [element]: placeholderArray
            });
        });
        console.log(objPlaceholder);
        return objPlaceholder;
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

    setVisuals(obj: any) {
        obj.forEach((element, index) => {
            //if (element.category !== 'Home' && element.category !== 'Kpi-dash' && this.filteringCheckboxes.controls[element.category].value) {
            if (document.getElementById(element.headerNoSpace) !== null) {
                const placeholderDiv = document.getElementById(element.headerNoSpace);
                const optionsDesktop = {
                    hideTabs: true,
                    width: "100%",
                    height: "100%",
                    //margin: "0 auto",
                    onFirstInteractive: function () {
                        // The viz is now ready and can be safely used.
                        console.log("Run this code when the viz has finished loading.");
                    }
                };

                this.kpiViz = new tableau.Viz(placeholderDiv, element['viz'], optionsDesktop);
            }
        });
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

    initFilteringForm(obj: any) {
        this.filteringCheckboxes = this.formBuilder.group({
            // Critical: true,
            // Regional: true,
            // Testing: true,
            // Growth: true
        });
        let keysArr = [];
        obj.forEach(element => {
            keysArr.push(Object.keys(element));
        });
        keysArr.forEach(element => {
            this.filteringCheckboxes.addControl(element, this.formBuilder.control(true));
        });
    }

    initDropdownForm(array: any) {
        this.dropdownList = this.formBuilder.group({});
        if (this.path === '') {
            this.dropdownList.addControl('phu', this.formBuilder.control(''));
        } else {
            this.dropdownList.addControl('phu', this.formBuilder.control(this.path));
        }
        this.dropdownList.addControl('searchCtrl', this.formBuilder.control(''));
    }

    routeonSelection(route: string) {
        this.router.navigate(['/grid/' + route]);
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
