import { Component, OnInit, OnDestroy, Input } from '@angular/core';
@Component({
    selector: 'app-common-mobile-visual',
    templateUrl: './common-mobile-visual.component.html',
    styleUrls: ['./common-mobile-visual.component.scss']
})

export class CommonMobileVisualComponent implements OnInit, OnDestroy {

    @Input() visualName: string;

    visualToRender = '';

    ngOnInit() {
        switch (this.visualName) {
            case 'Critical Care by Region Analysis':
                this.visualToRender = 'CriticalCareByRegion';
                break;
            case 'Capacity Analysis':
                this.visualToRender = 'Capacity';
                break;
            case 'Regional Analysis':
                this.visualToRender = 'Regional';
                break;
            case 'Testing Analysis':
                this.visualToRender = 'Testing';
                break;
            default:
                break;
        }
    }

    ngOnDestroy() {

    }

}