import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var tableau: any;

@Component({
    selector: 'app-analysis-capacity',
    templateUrl: './analysis.capacity.component.html'
})

export class AnalysisCapacityComponent implements OnInit {
    toggleTextFlag = true;
    viz: any;
    is_full: boolean = true;

    constructor() {
        this.refresh_layout(window.innerWidth);
    }

    ngOnInit() {
        const placeholderDivMobiile = document.getElementById('capacityVizMobile');
        const placeholderDivDesktop = document.getElementById('capacityVizDesktop');
        const url = "https://public.tableau.com/views/RequiredBeds/Dashboard1?:display_count=y&publish=yes&:origin=viz_share_link";

        const options = {
            hideTabs: true,
            width: "100%",
            height: "730px",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            }
        };

        const optionsDesktop = {
            hideTabs: true,
            width: "100%",
            height: "840px",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            }
        };

        if (!this.is_full) {
            this.viz = new tableau.Viz(placeholderDivMobiile, url, options);
        } else {
            this.viz = new tableau.Viz(placeholderDivDesktop, url, optionsDesktop);
        }
    }

    toggleText() {
        this.toggleTextFlag = !this.toggleTextFlag;
    }

    private refresh_layout(width) {
        this.is_full = window.innerWidth >= 1024 ? true : false;
    }
}