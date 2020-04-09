import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from 'src/app/pages/home/home.component';
import {ConnectComponent} from 'src/app/pages/connect/connect.component';
import {ResourcesComponent} from 'src/app/pages/resources/resources.component';
import {StoryComponent} from 'src/app/pages/story/story.component';
import {AnalysisComponent} from 'src/app/pages/analysis/analysis.component';
import {AnalysisCriticalComponent} from './pages/analysis/analysis.critical.component';
import {AnalysisGrowthComponent} from './pages/analysis/analysis.growth.component';
import {AnalysisRegionalComponent} from './pages/analysis/analysis.regional.component';
import {AnalysisTestingComponent} from './pages/analysis/analysis.testing.component';
import {AnalysisCapacityComponent} from './pages/analysis/analysis.capacity.component';
import {DataComponent} from 'src/app/pages/data/data.component';
import {OutreachComponent} from 'src/app/pages/outreach/outreach.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'data', component: DataComponent},
  {path: 'team', component: StoryComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'connect', component: ConnectComponent},
  {path: 'outreach', component: OutreachComponent},
  {
    path: 'analysis',
    component: AnalysisComponent,
    children: [
      {path: 'critical', component: AnalysisCriticalComponent},
      {path: 'regional', component: AnalysisRegionalComponent},
      {path: 'testing', component: AnalysisTestingComponent},
      {path: 'capacity', component: AnalysisCapacityComponent},
      {path: 'growth', component: AnalysisGrowthComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
