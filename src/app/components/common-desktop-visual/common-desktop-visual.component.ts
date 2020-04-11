import { Component, OnInit, OnDestroy, AfterViewInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    text: string;
    category: string;
    height: string;

    viz: any;
    is_full = true;
    toggleTextFlag = true;

    constructor(
        private dialogRef: MatDialogRef<CommonDesktopVisualComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.refresh_layout(window.innerWidth);
        this.visualName = data.visualName;
        this.vizUrl = data.vizUrl;
        this.text = data.textContent;
        this.category = data.visualCategory;
        this.height = data.vizHeight + 'px';
    }

    ngOnInit() {


    }

    ngAfterViewInit() {
        this.constructViz();
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

    private refresh_layout(width) {
        this.is_full = window.innerWidth >= 1024 ? true : false;
    }
}