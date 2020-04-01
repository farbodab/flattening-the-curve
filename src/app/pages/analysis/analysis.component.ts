import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var tableau: any;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  viz: any;


  constructor(private api_service : ApiService) {

  }

  ngOnInit() {

    var placeholderDiv = document.getElementById('vizContainer');
    var url = "https://public.tableau.com/views/OntarioCOVID-19TestingAnalysis/Testing?:display_count=y&:origin=viz_share_link"

    var options = {
        hideTabs: true,
        width: "100%",
        height: "900px",
        onFirstInteractive: function() {
              // The viz is now ready and can be safely used.
              console.log("Run this code when the viz has finished loading.");
    }}

    this.viz = new tableau.Viz(placeholderDiv, url, options);

    var placeholderDiv = document.getElementById('vizContainertwo');
    var url = "https://public.tableau.com/views/OntarioCOVID-19RegionalAnalysis/Dashboard1?:display_count=y&:origin=viz_share_link"

    var options = {
        hideTabs: true,
        width: "100%",
        height: "1450px",
        onFirstInteractive: function() {
              // The viz is now ready and can be safely used.
              console.log("Run this code when the viz has finished loading.");
    }}

    this.viz = new tableau.Viz(placeholderDiv, url, options);

  }

}
