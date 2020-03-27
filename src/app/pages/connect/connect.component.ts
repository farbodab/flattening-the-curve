import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  on_sign_up_pressed() {
    window.location.href = 'https://www.surveymonkey.com/r/Y7X86JL';
  }

}
