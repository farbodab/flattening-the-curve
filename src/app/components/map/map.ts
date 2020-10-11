import { Component, Inject, NgZone, PLATFORM_ID, Input, OnChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_region_canada_onLow from "@amcharts/amcharts4-geodata/region/canada/onLow";

// Test

var transformed = [{"phu":"York Region Public Health Services","HR_UID":3570.0,"date":"2020-10-06T00:00:00.000Z","rolling":49.28571429,"rolling_pop":4.282154512,"rolling_test_twenty_four":null,"confirmed_positive":2.0,"critical_care_pct":0.9777777778,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Peel Public Health","HR_UID":3553.0,"date":"2020-10-06T00:00:00.000Z","rolling":88.28571429,"rolling_pop":5.976549875,"rolling_test_twenty_four":null,"confirmed_positive":9.0,"critical_care_pct":0.8780487805,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Durham Region Health Department","HR_UID":3530.0,"date":"2020-10-06T00:00:00.000Z","rolling":13.42857143,"rolling_pop":1.964378709,"rolling_test_twenty_four":null,"confirmed_positive":1.0,"critical_care_pct":0.8139534884,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Simcoe Muskoka District Health Unit","HR_UID":3560.0,"date":"2020-10-06T00:00:00.000Z","rolling":11.14285714,"rolling_pop":1.907504146,"rolling_test_twenty_four":null,"confirmed_positive":1.0,"critical_care_pct":0.7115384615,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Region of Waterloo, Public Health","HR_UID":3565.0,"date":"2020-10-06T00:00:00.000Z","rolling":15.0,"rolling_pop":2.590024951,"rolling_test_twenty_four":null,"confirmed_positive":1.0,"critical_care_pct":0.6973684211,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Halton Region Health Department","HR_UID":3536.0,"date":"2020-10-06T00:00:00.000Z","rolling":17.28571429,"rolling_pop":2.98025446,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.72,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Windsor-Essex County Health Unit","HR_UID":3568.0,"date":"2020-10-05T00:00:00.000Z","rolling":3.571428571,"rolling_pop":0.8438385609,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.7450980392,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Southwestern Public Health","HR_UID":3575.0,"date":"2020-10-06T00:00:00.000Z","rolling":1.428571429,"rolling_pop":0.6727279455,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.7619047619,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Wellington-Dufferin-Guelph Public Health","HR_UID":3566.0,"date":"2020-10-06T00:00:00.000Z","rolling":6.0,"rolling_pop":1.976870614,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.6923076923,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Thunder Bay District Health Unit","HR_UID":3562.0,"date":"2020-09-30T00:00:00.000Z","rolling":1.0,"rolling_pop":0.6358087487,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.7307692308,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Hamilton Public Health Services","HR_UID":3537.0,"date":"2020-10-06T00:00:00.000Z","rolling":11.71428571,"rolling_pop":2.062450498,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.8470588235,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Renfrew County and District Health Unit","HR_UID":3557.0,"date":"2020-10-06T00:00:00.000Z","rolling":1.714285714,"rolling_pop":1.59227006,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.2,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Eastern Ontario Health Unit","HR_UID":3558.0,"date":"2020-10-05T00:00:00.000Z","rolling":5.714285714,"rolling_pop":2.709553479,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.9375,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Porcupine Health Unit","HR_UID":3556.0,"date":"2020-10-05T00:00:00.000Z","rolling":1.0,"rolling_pop":1.164049495,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.4444444444,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Niagara Region Public Health Department","HR_UID":3546.0,"date":"2020-10-06T00:00:00.000Z","rolling":11.0,"rolling_pop":2.328298564,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.9833333333,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Northwestern Health Unit","HR_UID":3549.0,"date":"2020-10-02T00:00:00.000Z","rolling":2.571428571,"rolling_pop":3.16573131,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.5,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Lambton Public Health","HR_UID":3542.0,"date":"2020-10-01T00:00:00.000Z","rolling":1.0,"rolling_pop":0.7639711219,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.6428571429,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Grey Bruce Health Unit","HR_UID":3533.0,"date":"2020-10-05T00:00:00.000Z","rolling":1.714285714,"rolling_pop":0.9986110984,"rolling_test_twenty_four":null,"confirmed_positive":1.0,"critical_care_pct":0.7777777778,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Leeds, Grenville and Lanark District Health Unit","HR_UID":3543.0,"date":"2020-10-06T00:00:00.000Z","rolling":2.714285714,"rolling_pop":1.548648763,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.7058823529,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Haldimand-Norfolk Health Unit","HR_UID":3534.0,"date":"2020-10-05T00:00:00.000Z","rolling":1.428571429,"rolling_pop":1.227653635,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":1.0,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Haliburton, Kawartha, Pine Ridge District Health Unit","HR_UID":3535.0,"date":"2020-10-05T00:00:00.000Z","rolling":1.285714286,"rolling_pop":0.6804305159,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.7142857143,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Brant County Health Unit","HR_UID":3527.0,"date":"2020-10-05T00:00:00.000Z","rolling":2.428571429,"rolling_pop":1.625636867,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.5333333333,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Algoma Public Health Unit","HR_UID":3526.0,"date":"2020-10-06T00:00:00.000Z","rolling":1.0,"rolling_pop":0.858671292,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.75,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Huron Perth District Health Unit","HR_UID":3539.0,"date":"2020-10-05T00:00:00.000Z","rolling":1.285714286,"rolling_pop":0.9000198004,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.7,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Peterborough Public Health","HR_UID":3555.0,"date":"2020-10-05T00:00:00.000Z","rolling":2.571428571,"rolling_pop":1.738990979,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.8529411765,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Kingston, Frontenac and Lennox & Addington Public Health","HR_UID":3541.0,"date":"2020-10-06T00:00:00.000Z","rolling":3.285714286,"rolling_pop":1.595394166,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.9275362319,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Chatham-Kent Health Unit","HR_UID":3540.0,"date":"2020-10-03T00:00:00.000Z","rolling":1.285714286,"rolling_pop":1.214347106,"rolling_test_twenty_four":null,"confirmed_positive":null,"critical_care_pct":null,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Sudbury & District Health Unit","HR_UID":3561.0,"date":"2020-09-29T00:00:00.000Z","rolling":1.714285714,"rolling_pop":0.839541862,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.7,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"North Bay Parry Sound District Health Unit","HR_UID":3547.0,"date":"2020-09-19T00:00:00.000Z","rolling":1.428571429,"rolling_pop":1.107042116,"rolling_test_twenty_four":null,"confirmed_positive":null,"critical_care_pct":null,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Timiskaming Health Unit","HR_UID":3563.0,"date":"2020-09-29T00:00:00.000Z","rolling":1.857142857,"rolling_pop":5.490931515,"rolling_test_twenty_four":null,"confirmed_positive":0.0,"critical_care_pct":0.5555555556,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Hastings and Prince Edward Counties Health Unit","HR_UID":3538.0,"date":"2020-10-03T00:00:00.000Z","rolling":1.142857143,"rolling_pop":0.6757829791,"rolling_test_twenty_four":null,"confirmed_positive":null,"critical_care_pct":null,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Toronto Public Health","HR_UID":3595.0,"date":"2020-10-06T00:00:00.000Z","rolling":221.0,"rolling_pop":7.47625865,"rolling_test_twenty_four":null,"confirmed_positive":18.0,"critical_care_pct":0.8410852713,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Middlesex-London Health Unit","HR_UID":3544.0,"date":"2020-10-06T00:00:00.000Z","rolling":5.857142857,"rolling_pop":1.18582208,"rolling_test_twenty_four":null,"confirmed_positive":1.0,"critical_care_pct":0.8244274809,"rt_ml":null,"rt_low":null,"rt_high":null},{"phu":"Ottawa Public Health","HR_UID":3551.0,"date":"2020-10-06T00:00:00.000Z","rolling":90.14285714,"rolling_pop":8.94717297,"rolling_test_twenty_four":null,"confirmed_positive":6.0,"critical_care_pct":0.8439306358,"rt_ml":null,"rt_low":null,"rt_high":null}]


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
        polygonTemplate.tooltipText = "Region: {ENGNAME}\nRisk: {risk}";
        polygonTemplate.fill = am4core.color("#367B25");
        polygonSeries.include = ["3526","3527","3530","3533","3534","3535",
        "3536","3537","3538","3539","3540","3541","3542","3543","3544","3546",
        "3547","3549","3551","3553","3555","3556","3557","3558","3560","3561",
        "3562","3563","3565","3566","3568","3570","3575","3595"];


        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");

        hs.properties.fill = am4core.color("#FFF");
        chart.zoomControl = new am4maps.ZoomControl();

        if (this.data) {
          var colors = [];
          this.data.forEach(item => {
              if (item["rolling_pop"] >= 10){
                colors.push({
                  "id": Math.round(item["HR_UID"]).toString(),
                  "fill": am4core.color("#D94711"),
                  "risk": "Curving up Dangerously",
                });
              }
              else if (item["rolling_pop"] >= 5){
                colors.push({
                  "id": Math.round(item["HR_UID"]).toString(),
                  "fill": am4core.color("#F28E13"),
                  "risk": "Curving Up Quickly",
                });
              }
              else if (item["rolling_pop"] >= 1){
                colors.push({
                  "id": Math.round(item["HR_UID"]).toString(),
                  "fill": am4core.color("#F2BB13"),
                  "risk": "Curving Up Somewhat",
                });
              }
              else {
                colors.push({
                  "id": Math.round(item["HR_UID"]).toString(),
                  "fill": am4core.color("#12A67C"),
                  "risk": "Curving Down",
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
