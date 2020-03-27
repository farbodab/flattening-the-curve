import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var tableau: any;

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  phu_data : any;
  phu_new_data : any;
  test_result_data : any;
  showVar: boolean = false;
  ontario: any = "Ontario";
  toronto: any = "Toronto";
  algoma : any = "Algoma";
  brant: any = "Brant";
  chatham : any = "Chatham-Kent";
  durham : any = "Durham";
  eastern : any = "Eastern";
  grey : any = "Grey Bruce";
  haliburton : any = "Haliburton Kawartha Pineridge";
  hamilton : any = "Hamilton";
  hastings : any = "Hastings Prince Edward";
  huron : any = "Huron Perth";
  kingston : any = "Kingston Frontenac Lennox & Addington";
  middlesex : any = "Middlesex-London";
  northwestern : any = "Northwestern";
  nr : any = "Not Reported";
  ottawa : any = "Ottawa";
  peel : any = "Peel";
  peterborough : any = "Peterborough";
  porcupine : any = "Porcupine";
  simcoe : any = "Simcoe Muskoka";
  sudbury : any = "Sudbury";
  waterloo : any = "Waterloo";
  wellington : any = "Wellington Dufferin Guelph";
  windsor : any = "Windsor-Essex";
  york : any = "York";
  viz: any;


  constructor(private api_service : ApiService) {

  }

  ngOnInit() {

    this.api_service.get_phu_data(data => {
      this.phu_data = data;
    }, error => {
      console.error(error);
    })

    this.api_service.get_phunew_data(data => {
      this.phu_new_data = data;
    }, error => {
      console.error(error);
    })

    this.api_service.get_test_results_data(data => {
      this.test_result_data = data;
    }, error => {
      console.error(error);
    })

   
    var placeholderDiv = document.getElementById('vizContainer');
    var url = "https://public.tableau.com/views/HowsMyFlattening-Testing/Testing?:display_count=y&publish=yes&:origin=viz_share_link"

    var options = {
        hideTabs: true,
        width: "100%",
        height: "650px",
        onFirstInteractive: function() {
              // The viz is now ready and can be safely used.
              console.log("Run this code when the viz has finished loading.");
    }}

    this.viz = new tableau.Viz(placeholderDiv, url, options);

    var placeholderDiv = document.getElementById('vizContainertwo');
    var url = "https://public.tableau.com/views/HowsMyFlattening-RegionalAnalysis/Dashboard1?:display_count=y&:origin=viz_share_link"

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

  toggleChild(){
    this.showVar = !this.showVar;
  }

}
