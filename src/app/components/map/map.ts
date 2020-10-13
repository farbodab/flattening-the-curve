import { Component, Inject, NgZone, PLATFORM_ID, Input, OnChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_region_canada_onLow from "@amcharts/amcharts4-geodata/region/canada/onLow";


@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})

export class MapComponent {

    @Input() data: any;
    private chart: am4maps.MapChart;

    constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {}

    // Run the function only in the browser
    browserOnly(f: () => void) {
      if (isPlatformBrowser(this.platformId)) {
        this.zone.runOutsideAngular(() => {
          f();
        });
      }
    }

    ngOnChanges() {
      this.ngAfterViewInit()
    }

    ngAfterViewInit() {
      // Chart code goes in here
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);

        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        // chart.geodata = boundary['default']
        // console.log(boundary)
        chart.geodataSource.url = "/assets/map/Ministry_of_Health_Public_Health_Unit_Boundary.geojson";
        // let currentMap = "usaAlbersLow";

        // Set projection
        chart.projection = new am4maps.projections.Mercator();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "Region: {ENGNAME}\nRisk: {risk}\nCase Incidence: {incidence}";
        polygonTemplate.fill = am4core.color("#367B25");
        polygonSeries.include = ["3526","3527","3530","3533","3534","3535",
        "3536","3537","3538","3539","3540","3541","3542","3543","3544","3546",
        "3547","3549","3551","3553","3555","3556","3557","3558","3560","3561",
        "3562","3563","3565","3566","3568","3570","3575","3595"];


        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");

        hs.properties.fill = am4core.color("#391F85");
        chart.zoomControl = new am4maps.ZoomControl();

        if (this.data) {
          var colors = [];
          this.data.forEach(item => {
              if (item["rolling_pop"] >= 10){
                colors.push({
                  "id": Math.round(item["HR_UID"]).toString(),
                  "fill": am4core.color("#D94711"),
                  "risk": "Curving up Dangerously",
                  "incidence": item["rolling_pop"].toFixed(2).toString(),
                });
              }
              else if (item["rolling_pop"] >= 5){
                colors.push({
                  "id": Math.round(item["HR_UID"]).toString(),
                  "fill": am4core.color("#F28E13"),
                  "risk": "Curving Up Quickly",
                  "incidence": item["rolling_pop"].toFixed(2).toString(),
                });
              }
              else if (item["rolling_pop"] >= 1){
                colors.push({
                  "id": Math.round(item["HR_UID"]).toString(),
                  "fill": am4core.color("#F2BB13"),
                  "risk": "Curving Up Somewhat",
                  "incidence": item["rolling_pop"].toFixed(2).toString(),
                });
              }
              else {
                colors.push({
                  "id": Math.round(item["HR_UID"]).toString(),
                  "fill": am4core.color("#12A67C"),
                  "risk": "Curving Down",
                  "incidence": item["rolling_pop"].toFixed(2).toString(),
                });
              }
          })
          polygonSeries.data = colors
          polygonTemplate.propertyFields.fill = "fill";
        }

        //
        // chart.homeZoomLevel = 2
        // chart.homeGeoPoint = {
        //   latitude: -55,
        //   longitude: 50
        // };

        polygonTemplate.events.on("hit", function(ev) {
          // get object info
          console.log(ev.target.dataItem.dataContext['id']);
        });

        this.chart = chart;
      });
    }

    ngOnDestroy() {
      // Clean up chart when the component is removed
      this.browserOnly(() => {
        if (this.chart) {
          this.chart.dispose();
        }
      });
    }
  }
