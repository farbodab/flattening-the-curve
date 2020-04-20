import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { CommonDesktopVisualComponent } from '../../components/common-desktop-visual/common-desktop-visual.component';
import { DomSanitizer } from '@angular/platform-browser';

declare var tableau: any;

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit, AfterViewInit {
    viz: any;
    kpiViz: any;
    graph_data = null;

    window_subscription: Subscription;
    is_full: boolean = true;
    filteringCheckboxes: FormGroup;
    selectedCategory = '';
    jsonObj: any;
    categoryList = [];
    gridList = [];

    constructor(private host_service: HostService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private api_service: ApiService, private sanitizer: DomSanitizer) {
        this.refresh_layout(window.innerWidth);
    }

    ngOnInit() {
        this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
            this.refresh_layout(window.innerWidth);
        });
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
        this.api_service.get_plot_obj().subscribe(
            data => {
                this.jsonObj = data;
                this.jsonObj = this.addSelectedProperty(this.jsonObj);
                this.jsonObj = this.addHeaderNoSpaces(this.jsonObj);
                this.findKpiViz(this.jsonObj);
                this.iterateCategories(this.jsonObj);
                this.gridList = this.restructureObj(this.jsonObj, this.categoryList);
                this.initFilteringForm(this.gridList);
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
            obj.forEach(item => {
                if (item.category === element) {
                    placeholderArray.push(item);
                }
            });
            objPlaceholder.push({
                [element]: placeholderArray
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
        console.log(obj);
        obj.forEach((element, index) => {
            //if (element.category !== 'Home' && element.category !== 'Kpi-dash' && this.filteringCheckboxes.controls[element.category].value) {
            if (document.getElementById(element.headerNoSpace) !== null) {
                console.log(element);
                const placeholderDiv = document.getElementById(element.headerNoSpace);
                console.log(placeholderDiv);
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
        console.log(obj);
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
        console.log(keysArr);
        keysArr.forEach(element => {
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

    test() {
        console.log(document.getElementById('CapacityAnalysis'));
        this.setVisuals(this.jsonObj);
    }
    private refresh_layout(width) {
        this.is_full = window.innerWidth >= 1024 ? true : false;
    }
}
