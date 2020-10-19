import { Component, Inject, NgZone, PLATFORM_ID, Input, OnChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_region_canada_onLow from "@amcharts/amcharts4-geodata/region/canada/onLow";


@Component({
  selector: 'app-map-fsa',
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})

export class FSAMapComponent {

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
        chart.geodataSource.url = "/assets/map/FSA.geojson";
        // let currentMap = "usaAlbersLow";

        // Set projection
        chart.projection = new am4maps.projections.Mercator();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "Region: {id}";
        polygonTemplate.fill = am4core.color("#367B25");
        polygonSeries.include = ["N0G", "NOH", "N4N"];

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");

        hs.properties.fill = am4core.color("#391F85");
        chart.zoomControl = new am4maps.ZoomControl();

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
