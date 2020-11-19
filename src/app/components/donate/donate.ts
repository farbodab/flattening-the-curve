import { Component } from '@angular/core';

@Component({
    selector: 'app-donate',
    templateUrl: './donate.html',
    styleUrls: ['./donate.scss']
})

export class DonateComponent {

  is_full = true;

  constructor() {
    this.refresh_layout(window.innerWidth);
  }

  private refresh_layout(width) {
    this.is_full = window.innerWidth >= 1024 ? true : false;
  }

}
