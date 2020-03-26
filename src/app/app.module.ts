import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { StoryComponent } from './pages/story/story.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { ConnectComponent } from './pages/connect/connect.component';
import { HomeGraphComponent } from './components/home-graph/home-graph.component';
import { HomeGraphOntComponent } from './components/home-graph-ont/home-graph-ont.component';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { DataComponent } from './pages/data/data.component';
import { NumCasesTotalGraphComponent } from './components/num-cases-total-graph/num-cases-total-graph.component';
import { NumCasesTimeGraphComponent } from './components/num-cases-time-graph/num-cases-time-graph.component';
import { DataCapacityConservativeResAvailComponent } from './components/data-capacity-conservative-res-avail/data-capacity-conservative-res-avail.component';
import { DataCapacityItalyResAvailComponent } from './components/data-capacity-italy-res-avail/data-capacity-italy-res-avail.component';
import { DataCapacityConservativeWaitingResComponent } from './components/data-capacity-conservative-waiting-res/data-capacity-conservative-waiting-res.component';
import { DataCapacityItalyWaitingResComponent } from './components/data-capacity-italy-waiting-res/data-capacity-italy-waiting-res.component';
import { DataTestingOverTimeComponent } from './components/data-testing-over-time/data-testing-over-time.component';
import { DataTestProportionByResultComponent } from './components/data-test-proportion-by-result/data-test-proportion-by-result.component';
import { DataRegionalMapComponent } from './components/data-regional-map/data-regional-map.component';


PlotlyViaCDNModule.plotlyVersion = '1.49.4'; // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.plotlyBundle = 'basic'; // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StoryComponent,
    ResourcesComponent,
    ConnectComponent,
    HomeGraphComponent,
    HomeGraphOntComponent,
    DataComponent,
    NumCasesTotalGraphComponent,
    NumCasesTimeGraphComponent,
    DataCapacityConservativeResAvailComponent,
    DataCapacityItalyResAvailComponent,
    DataCapacityConservativeWaitingResComponent,
    DataCapacityItalyWaitingResComponent,
    DataTestingOverTimeComponent,
    DataTestProportionByResultComponent,
    DataRegionalMapComponent
  ],
  imports: [
    BrowserModule,
    PlotlyViaCDNModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
