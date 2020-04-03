import {Component, OnInit} from '@angular/core';

declare var tableau: any;

@Component({
    selector: 'app-analysis-critical',
    templateUrl: './analysis.critical.component.html'
})

export class AnalysisCriticalComponent implements OnInit {
    viz: any;

    ngOnInit() {

        const placeholderDiv = document.getElementById('vizContainerCritical');
        const url = "https://public.tableau.com/views/CriticalCareCapacity/Dashboard1?:display_count=y&:origin=viz_share_link";

        const options = {
            hideTabs: true,
            width: "100%",
            height: "1450px",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            }

        };
        this.viz = new tableau.Viz(placeholderDiv, url, options);
    }
}