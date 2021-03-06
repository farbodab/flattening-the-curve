import { Component, OnInit, OnDestroy, AfterViewInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HostService } from '../../services/host.service';

declare var tableau: any;

@Component({
    selector: 'app-common-desktop-visual',
    templateUrl: './common-desktop-visual.component.html',
    styleUrls: ['./common-desktop-visual.component.scss']
})

export class CommonDesktopVisualComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('vizContainerDesktop', { static: true }) containerDiv: ElementRef;

    visualName: string;
    vizUrl: string;
    topText: string;
    bottomText: string;
    category: string;
    height: string;
    type: string;
    mapPopup = false;
    currentUrl = '';
    fromDashboard = false;

    viz: any;
    toggleTextFlag = true;

    constructor(
        private dialogRef: MatDialogRef<CommonDesktopVisualComponent>,
        private host_service: HostService,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.visualName = data.visualName;
        this.vizUrl = data.vizUrl;
        this.topText = data.topTextContent;
        this.bottomText = data.bottomTextContent;
        console.log(this.vizUrl);
        this.category = data.visualCategory;
        this.height = data.vizHeight + 'px';
        this.type = data.vizType;
        this.fromDashboard = data.dashboard;
    }

    ngOnInit() {
        this.currentUrl =  encodeURIComponent(window.location.href);
    }

    ngAfterViewInit() {
        if (this.type === 'Tableau') {
            this.constructViz();
        }
    }

    ngOnDestroy() {

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
            width: "100%",
            height: this.height,
            //margin: "0 auto",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            }
        };

        this.viz = new tableau.Viz(this.containerDiv.nativeElement, this.vizUrl, options);
    }
}
