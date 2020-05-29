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

  teamChoices = ['Leader', 'Maintainer', 'Committer', 'Contributors', 'Advisor', 'All'];
  teamChoicesCount = [];

  tooltipToggle = false;

  tooltipArray = [
    {
      'Leaders': "Responsible for the overall vision and direction of HowsMyFlattening, including making the final decision about features, releases, and other activities."
    },
    {
      'Maintainers': "Members of the community responsible for managing specific parts of the project on an on-going basis."
    },
    {
      'Committers': "Trusted members of the community who make a consistent time and knowledge contribution to the project."
    },
    {
      'Contributors': "Individuals who have contributed in any shape or form -- the specific project or scope of work can vary from day to weeks."
    },
    {
      'Advisors': "This group provides their feedback and expertise on an ongoing basis to the group."
    }
  ];

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
      //if (element.team_status !== 'Advisor') {
        placeholderArray[choices.indexOf(element.team_status)] += 1;
        placeholderArray[choices.indexOf('All')] += 1;
      //}
    });

    return placeholderArray;
  }

  toggleHover(bool: boolean) {
    this.tooltipToggle = bool;
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }
}
