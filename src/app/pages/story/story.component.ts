import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, AfterViewInit {

  jsonObj: any;
  teamForm: FormGroup;

  teamChoices = ['Leader', 'Maintainer', 'Committer', 'Contributors', 'All'];
  teamChoicesObj = {};

  constructor(private api_service: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.fetchDataObj();
  }

  fetchDataObj() {
    this.api_service.get_team_obj().subscribe(
      data => {
        this.jsonObj = data;
        this.initTeamForm(this.teamChoices);
        this.teamChoicesObj = this.iterateTeam(this.jsonObj, this.teamChoices);
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
    let placeholderObj = {};

    choices.forEach(element => {
      placeholderObj[element] = 0;
    });

    obj.forEach(element => {
      placeholderObj[element.team_status] = 1;
    });

    return placeholderObj;
  };

}
