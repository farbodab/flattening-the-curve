import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements AfterViewInit {
    embedLink: string;

    constructor(){
        this.embedLink="https://twitter.com/howsmyflattenON?ref_src=twsrc%5Etfw" ;
    }

    ngAfterViewInit() {
        (<any>window).twttr.widgets.load();
    }
}