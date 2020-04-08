import { Component, OnInit, OnDestroy, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

declare var tableau: any;

@Component({
    selector: 'app-analysis-critical',
    templateUrl: './analysis.critical.component.html'
})

export class AnalysisCriticalComponent implements OnInit, OnDestroy, AfterViewInit {
    viz: any;
    is_full = true;
    toggleTextFlag = true;

    constructor() {
        this.refresh_layout(window.innerWidth);
    }

    ngOnInit() {
        const placeholderDiv = document.getElementById('vizContainerCritical');
        const url = "https://public.tableau.com/views/CriticalCareCapacity/Dashboard1?:display_count=y&:origin=viz_share_link";

        const optionsDesktop = {
            hideTabs: true,
            width: "100%",
            height: "1450px",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            }

        };

        const optionsMobile = {
            hideTabs: true,
            width: "100%",
            height: "2550px",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            }

        };

        if (this.is_full) {
            this.viz = new tableau.Viz(placeholderDiv, url, optionsDesktop);
        } else {
            this.viz = new tableau.Viz(placeholderDiv, url, optionsMobile);
        }
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        //this.viz.dispose();
    }

    toggleText() {
        this.toggleTextFlag = !this.toggleTextFlag;
    }

    private refresh_layout(width) {
        this.is_full = window.innerWidth >= 1024 ? true : false;
    }
}
