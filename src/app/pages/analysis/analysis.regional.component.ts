import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var tableau: any;

@Component({
    selector: 'app-analysis-regional',
    templateUrl: './analysis.regional.component.html'
})

export class AnalysisRegionalComponent implements OnInit, OnDestroy, AfterViewInit {
    viz: any;
    toggleTextFlag = true;
    is_full = true;

    constructor() {
        this.refresh_layout(window.innerWidth);
    }

    ngOnInit() {
        const placeholderDiv = document.getElementById('vizContainerRegional');
        const url = "https://public.tableau.com/views/OntarioCOVID-19RegionalAnalysis/Dashboard1?:display_count=y&:origin=viz_share_link";

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
            height: "2000px",
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
