import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HostService } from '../../services/host.service';
import { Subscription } from 'rxjs';

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

  constructor(private api_service: ApiService, private formBuilder: FormBuilder, private host_service: HostService) {
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
        console.log(this.jsonObj);
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

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }

}
