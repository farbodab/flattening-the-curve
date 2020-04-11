import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var tableau: any;

@Component({
    selector: 'app-common-mobile-visual',
    templateUrl: './common-mobile-visual.component.html',
    styleUrls: ['./common-mobile-visual.component.scss']
})

export class CommonMobileVisualComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('vizContainerMobile', {static: true}) containerDiv: ElementRef;

    @Input() visualName: string;
    @Input() text: string;
    @Input() vizUrl: string;

    visualToRender = '';
    toggleTextFlag = true;
    viz: any;
    idPlaceholder: string[];

    ngOnInit() {
        // switch (this.visualName) {
        //     case 'Critical Care by Region Analysis':
        //         this.visualToRender = 'CriticalCareByRegion';
        //         break;
        //     case 'Capacity Analysis':
        //         this.visualToRender = 'Capacity';
        //         break;
        //     case 'Regional Analysis':
        //         this.visualToRender = 'Regional';
        //         break;
        //     case 'Testing Analysis':
        //         this.visualToRender = 'Testing';
        //         break;
        //     default:
        //         break;
        // }
        this.idPlaceholder = this.visualName.split(' ');
        this.constructViz();
    }

    ngAfterViewInit() {
        this.constructViz();
    }

    ngOnDestroy() {
        //this.viz.dispose();
    }

    toggleText() {
        this.toggleTextFlag = !this.toggleTextFlag;
    }

    constructViz() {
        if (typeof this.viz !== 'undefined') {
            this.viz.dispose();
        }

        const options = {
            hideTabs: true,
            // width: "100%",
            // height: "730px",
            margin: "0 auto",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            }
        };

        this.viz = new tableau.Viz(this.containerDiv.nativeElement, this.vizUrl, options);
    }
}
