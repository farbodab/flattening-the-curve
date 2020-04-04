import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from 'src/app/modules/material/material.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './pages/home/home.component';
import {StoryComponent} from './pages/story/story.component';
import {ResourcesComponent} from './pages/resources/resources.component';
import {ConnectComponent} from './pages/connect/connect.component';
import {AnalysisComponent} from './pages/analysis/analysis.component';
import {AnalysisCriticalComponent} from './pages/analysis/analysis.critical.component';
import {AnalysisGrowthComponent} from './pages/analysis/analysis.growth.component';
import {AnalysisRegionalComponent} from './pages/analysis/analysis.regional.component';
import {AnalysisTestingComponent} from './pages/analysis/analysis.testing.component';
import {AnalysisCapacityComponent} from './pages/analysis/analysis.capacity.component';
import {DataComponent} from './pages/data/data.component';

import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAnalyticsModule, ScreenTrackingService} from '@angular/fire/analytics';
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        StoryComponent,
        ResourcesComponent,
        ConnectComponent,
        AnalysisComponent,
        AnalysisCriticalComponent,
        AnalysisRegionalComponent,
        AnalysisTestingComponent,
        AnalysisCapacityComponent,
        AnalysisGrowthComponent,
        DataComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        MatButtonToggleModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        ScreenTrackingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
