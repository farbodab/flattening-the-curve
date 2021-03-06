import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from 'src/app/modules/material/material.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AlertComponent} from './components/alert/alert';
import {VaccineComponent} from './components/vaccine/vaccine';
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
import { GridComponent } from './pages/grid/grid.component';

import { ScorecardComponent } from './components/scorecard/scorecard.component';
import { FooterComponent } from './components/footer/footer.component';
import { TableComponent } from './components/table/table.component';
import { SubscribeComponent } from './components/subscribe/subscribe';
import { ThermometerComponent } from './components/thermometer/thermometer';
import { ChevronComponent } from './components/chevron/chevron';
import { BannerComponent } from './components/banner/banner';
import { TableauComponent } from './components/story/story';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';


import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAnalyticsModule, ScreenTrackingService} from '@angular/fire/analytics';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { CommonMobileVisualComponent } from './components/common-mobile-visual/common-mobile-visual.component';
import { PlotComponent } from './components/plot/plot';
import { GraphComponent } from './components/graph/graph';
import { MapComponent } from './components/map/map';
import { DonateComponent } from './components/donate/donate';
import { AngularPlotlyComponent } from './components/plotly-angular/plotly-angular.component';
import { OutreachComponent } from './pages/outreach/outreach.component';
import { CommonDesktopVisualComponent } from './components/common-desktop-visual/common-desktop-visual.component';
import { BlogComponent } from './pages/blog/blog.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { PlotlyViaCDNModule } from 'angular-plotly.js';

import { MainPipe } from './pipe/pipe.module';
import { AppConfigService } from './providers/app-config.service';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';

PlotlyViaCDNModule.plotlyVersion = 'latest'; // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.plotlyBundle = null; // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'

export function initConfig(appConfig: AppConfigService) {
    return () => appConfig.loadConfig();
}


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
        BlogComponent,
        DataComponent,
        CommonMobileVisualComponent,
        OutreachComponent,
        CommonDesktopVisualComponent,
        GridComponent,
        PlotComponent,
        AngularPlotlyComponent,
        ScorecardComponent,
        FooterComponent,
        SummaryComponent,
        GraphComponent,
        TableComponent,
        MapComponent,
        DonateComponent,
        ThermometerComponent,
        SubscribeComponent,
        ChevronComponent,
        BannerComponent,
        AlertComponent,
        VaccineComponent,
        TableauComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        PlotlyViaCDNModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MainPipe,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatIconModule,
        MatSnackBarModule,
        MatButtonModule,
        MatSortModule,
        MatListModule,
        MatTableModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatInputModule,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        ScreenTrackingService,
        {provide: MatDialogRef, useValue: {}},
        {
          provide: APP_INITIALIZER,
          useFactory: initConfig,
          multi: true,
          deps: [AppConfigService]
        },
        CookieService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [AnalysisCriticalComponent, CommonDesktopVisualComponent]
})
export class AppModule { }
