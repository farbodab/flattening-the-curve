import {Component, OnInit} from '@angular/core';

declare var tableau: any;

@Component({
    selector: 'app-analysis-testing',
    templateUrl: './analysis.testing.component.html'
})
export class AnalysisTestingComponent implements OnInit {
    viz: any;

    ngOnInit() {

        const placeholderDiv = document.getElementById('vizContainerTesting');
        const url = "https://public.tableau.com/views/HowsMyFlattening-Testing/Testing?:display_count=y&publish=yes&:origin=viz_share_link";

        const options = {
            hideTabs: true,
            width: "100%",
            height: "900px",
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
                console.log("Run this code when the viz has finished loading.");
            }

        };
        this.viz = new tableau.Viz(placeholderDiv, url, options);
    }
}
