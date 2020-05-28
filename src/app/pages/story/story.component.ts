import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HostService } from '../../services/host.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, AfterViewInit {

  jsonObj: any;
  teamForm: FormGroup;
  is_full = true;
  window_subscription: Subscription;

  teamChoices = ['Leader', 'Maintainer', 'Committer', 'Contributors', 'All'];
  teamChoicesCount = [];

  constructor(private host_service: HostService, private api_service: ApiService, private formBuilder: FormBuilder) { 
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
    this.api_service.get_team_obj().subscribe(
      data => {
        this.jsonObj = data;
        this.initTeamForm(this.teamChoices);
        this.teamChoicesCount = this.iterateTeam(this.jsonObj, this.teamChoices);
      },
      error => {
        this.jsonObj = 'error';
      }
    );
  }

  initTeamForm(obj: any) {
    this.teamForm = this.formBuilder.group({});
    obj.forEach((element, index) => {
      if (index === 0) {
        this.teamForm.addControl(element, this.formBuilder.control(true));
      } else {
        this.teamForm.addControl(element, this.formBuilder.control(false));
      }
    });
    this.teamForm.addControl("Advisor", this.formBuilder.control(false));
  }

  toggleSelect(controlName: string) {
    Object.keys(this.teamForm.controls).forEach(key => {
      this.teamForm.controls[key].setValue(controlName === key);
    });
  }

  iterateTeam(obj: any, choices: string[]) {
    let placeholderArray = new Array(choices.length).fill(0);

    obj.forEach(element => {
      if (element.team_status !== 'Advisor') {
        placeholderArray[choices.indexOf(element.team_status)] += 1;
        placeholderArray[choices.indexOf('All')] += 1;
      }
    });

    return placeholderArray;
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
