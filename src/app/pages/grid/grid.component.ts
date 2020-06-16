import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, UrlTree, UrlSegment, UrlSegmentGroup, PRIMARY_OUTLET, DefaultUrlSerializer, RouterState, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatTooltip } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { CommonDesktopVisualComponent } from '../../components/common-desktop-visual/common-desktop-visual.component';
import * as moment from 'moment';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

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
    fetch_subscribe: Subscription;
    is_full: boolean = true;
    plot_window = '';
    filteringCheckboxes: FormGroup;
    dropdownList: FormGroup;
    averageForm: FormGroup;
    selectedCategory = '';
    jsonObj: any;
    categoryList = [];
    gridList = [];
    tab_obj = {};

    searchCtrl: string;
    iconHover: string;
    mapHover = false;

    urlSegments: any;
    path: string;
    headerLabel = '';
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
            phu: 'Huron County Health Unit',
            value: 'huron_county'
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

    constructor(private host_service: HostService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private api_service: ApiService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        this.refresh_layout(window.innerWidth);
        this.plot_layout(window.innerWidth);
        this.urlSegments = route.snapshot['_urlSegment'];
        iconRegistry.addSvgIcon(
            'thumbs-up',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/logo.svg'));
    }

    ngOnInit() {
        this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
            this.refresh_layout(window.innerWidth);
            this.plot_layout(window.innerWidth);
        });
        typeof (this.urlSegments.segments[1]) === 'undefined' ? this.path = '' : this.path = this.urlSegments.segments[1].path;
        this.fetchVizObj();
    }

    ngAfterViewInit() {
        //this.fetchVizObj();
    }

    ngOnDestroy() {
        if (this.window_subscription) {
            this.window_subscription.unsubscribe();
        }
        if (this.fetch_subscribe) {
            this.fetch_subscribe.unsubscribe();
        }
    }

    toggleHover(str: string) {
        this.iconHover = str;
    }

    toggleMap(bool: boolean) {
        this.mapHover = bool;
    }

    fetchVizObj() {
        this.fetch_subscribe = this.api_service.get_plot_obj().subscribe(
            data => {
                this.jsonObj = data;
                this.initDropdownForm(this.phuArray);
                this.tab_obj = this.initTabGroupings(this.jsonObj);
                this.iterateAverageForm(this.jsonObj, this.tab_obj);
                this.iterateCategories(this.jsonObj);
                this.gridList = this.restructureObj(this.jsonObj, this.categoryList);
                this.initFilteringForm(this.gridList);
                //this.setVisuals(this.jsonObj);
            },
            error => {
                console.error(error);
                alert(error);
            }
        );
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
        let data_obj = {};
        categoryList.forEach(element => {
            let placeholderArray = [];
            this.phuArray.forEach(phu => {
                let group_array = [];
                let group_obj = {};
                obj.forEach(item => {
                    if (item.category === element && (item.phu === phu.value) && !group_array.includes(item.group)) {
                        group_array.push(item.group);
                        let placeholderPhuArray = [item];
                        let header_array = [item.header];
                        obj.forEach(elementThree => {
                            if (item.phu === elementThree.phu && item.group === elementThree.group && !header_array.includes(elementThree.header)) {
                                header_array.push(elementThree.header);
                                placeholderPhuArray.push(elementThree);
                            }
                        });
                        Object.assign(group_obj, { [item.group]: placeholderPhuArray });
                    }
                });
                data_obj[phu.value] = this.sortKeys(group_obj);
            });
            objPlaceholder.push({
                [element]: data_obj
            });
        });
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

    openDialog(componentName: any, category: string, url: string, topText: string, bottomText: string, height: number): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            visualName: componentName,
            vizUrl: url,
            vizCategory: category,
            vizHeight: height,
            topTextContent: topText,
            bottomTextContent: bottomText,
            vizType: category === 'Map' ? 'Map' : 'Plotly'
        };
        dialogConfig.width = '300px';

        const dialogRef = this.dialog.open(CommonDesktopVisualComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
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
        this.filteringCheckboxes = this.formBuilder.group({});
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
            this.dropdownList.addControl('phu', this.formBuilder.control('ontario'));
            this.headerLabel = 'Ontario';
        } else {
            this.dropdownList.addControl('phu', this.formBuilder.control(this.path));
            const index = this.phuArray.findIndex(phu => phu.value === this.path);
            this.headerLabel = this.phuArray[index].phu;
        }
        this.dropdownList.addControl('searchCtrl', this.formBuilder.control(''));
    }

    initTabGroupings(array: any) {
        let tab_obj = {};
        let phu_array = [];
        array.forEach(element => {
            if (!phu_array.includes(element.phu)) {
                phu_array.push(element.phu);
                let group_array = [];
                let group_obj = {};
                array.forEach(elementTwo => {
                    if (elementTwo.phu === element.phu && !group_array.includes(elementTwo.group)) {
                        group_array.push(elementTwo.group);

                        let header_array = [];
                        header_array[elementTwo.tab_order] = {
                            header: elementTwo.header,
                            tab: elementTwo.tab,
                            order: elementTwo.tab_order
                        };

                        let header_array_check = [elementTwo.header];
                        array.forEach(elementThree => {
                            if (elementTwo.phu === elementThree.phu && elementTwo.group === elementThree.group && !header_array_check.includes(elementThree.header)) {
                                header_array_check.push(elementThree.header);

                                header_array[elementThree.tab_order] = {
                                    header: elementThree.header,
                                    tab: elementThree.tab,
                                    order: elementTwo.tab_order
                                };
                            }
                        });
                        Object.assign(group_obj, { [elementTwo.group]: header_array });
                    }
                });
                tab_obj[element.phu] = group_obj;
            }
        });
        return tab_obj;
    }

    sortKeys(obj_1: {}) {
        let keys = Object.keys(obj_1);
        var key = Object.keys(obj_1).filter((element, index) => {
            let placeholder_map_spot = keys[1];
            if (element === 'map') {
                keys[1] = element;
                keys[index] = placeholder_map_spot;
            }
        });

        var new_array = [];
        for (var i = 0; i < keys.length; i++) {
            new_array.push(obj_1[keys[i]]);
        }
        return new_array;
    }

    iterateAverageForm(array: any, tabObj: any) {
        this.averageForm = this.formBuilder.group({});
        const momentConst = moment().subtract(2, 'days').format('YYYY-MM-DD');
        const priorDate = momentConst.toString() + 'T00:00:00';
        //2020-05-01T00:00:00

        array.filter(element => {
            if (element.html.includes('7 Day Average')) {
                this.averageForm.addControl(element.phu + '' + element.header + 'average', this.formBuilder.control(true));
            } else {
                this.averageForm.addControl(element.phu + '' + element.header + 'average', this.formBuilder.control('none'));
            }
        });
        array.filter(element => {
            if (element.html.includes(priorDate)) {
                this.averageForm.addControl(element.phu + '' + element.header + 'view', this.formBuilder.control('allTime'));
            } else {
                this.averageForm.addControl(element.phu + '' + element.header + 'view', this.formBuilder.control('none'));
            }
        });
        Object.keys(tabObj).forEach(element => {
            Object.keys(tabObj[element]).forEach(elementTwo => {
                tabObj[element][elementTwo].forEach((elementThree, index) => {
                    if (index === 0) {
                        this.averageForm.addControl(element + '' + elementTwo + '' + elementThree['header'], this.formBuilder.control(true));
                    } else {
                        this.averageForm.addControl(element + '' + elementTwo + '' + elementThree['header'], this.formBuilder.control(false));
                    }
                });
            });
        });
    }

    routeonSelection(route: string) {
        const index = this.phuArray.findIndex(phu => phu.value === route);
       this.headerLabel = this.phuArray[index].phu;
        this.router.navigate(['/dashboard/' + route]);
    }

    changeView(view: string, controlName: string) {
        this.averageForm.controls[controlName].setValue(view);
    }

    changeTabs(controlName: string, tabGroup: [], selectedHeader: string) {
        tabGroup.filter(element => {
            const headerString = element['header'];
            if (headerString !== selectedHeader) {
                this.averageForm.controls[controlName + '' + headerString].setValue(false);
            } else {
                this.averageForm.controls[controlName + '' + headerString].setValue(true);
            }
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

    private plot_layout(width) {
        this.plot_window = !this.is_full ? 'small' : (window.innerWidth > 1080 ? (window.innerHeight > 1440 ? 'xlarge' : 'large') : 'medium');
    }
}
