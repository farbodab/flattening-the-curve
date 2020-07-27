import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HostService } from '../../services/host.service';
import { Subscription } from 'rxjs';
import { CommonDesktopVisualComponent } from 'src/app/components/common-desktop-visual/common-desktop-visual.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, AfterViewInit {

  jsonObj: any;
  dataCategoryList = [];
  dataRegionList = [];
  filteringCheckboxes: FormGroup;
  is_full: boolean;
  window_subscription: Subscription;
  displayFooter = false;

  constructor(private api_service: ApiService, private formBuilder: FormBuilder, private host_service: HostService, public dialog: MatDialog) {
    this.refresh_layout(window.innerWidth);
  }

  ngOnInit() {
    this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
      this.refresh_layout(window.innerWidth);
    });
  }

  ngAfterViewInit() {
    this.fetchDataObj();
  }

  fetchDataObj() {
    this.api_service.get_data_obj().subscribe(
      data => {
        this.jsonObj = data;
        this.iterateCategories(this.jsonObj);
        this.iterateRegions(this.jsonObj);
        this.initFilteringForm(this.dataCategoryList, this.dataRegionList);
        this.displayFooter = true;
      },
      error => {
        this.jsonObj = 'error';
      }
    );
  }

  iterateCategories(obj: []) {
    let placeholderArray = [];
    obj.forEach((element, index) => {
      if (!placeholderArray.includes(element['type'])) {
        placeholderArray.push(element['type']);
      }
    });
    this.dataCategoryList = placeholderArray;
  }

  iterateRegions(obj: []) {
    let placeholderArray = [];
    obj.forEach((element, index) => {
      if (!placeholderArray.includes(element['region'])) {
        placeholderArray.push(element['region']);
      }
    });
    this.dataRegionList = placeholderArray;
  }

  initFilteringForm(category: string[], region: string[]) {
    this.filteringCheckboxes = this.formBuilder.group({
    });
    category.forEach(element => {
      this.filteringCheckboxes.addControl(element, this.formBuilder.control(true));
    });
    region.forEach(element => {
      this.filteringCheckboxes.addControl(element, this.formBuilder.control(true));
    });
  }

  openDialog(componentName: any, html: any, index: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      visualName: 'Data Dictionary for '+componentName,
      topTextContent: 'NaN',
      bottomTextContent: 'NaN',
      vizUrl: html,
      vizCategory: null,
      vizHeight: null,
      vizType: "dictionary"
    };

    dialogConfig.width = '300px';

    const dialogRef = this.dialog.open(CommonDesktopVisualComponent, dialogConfig);
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }

}
