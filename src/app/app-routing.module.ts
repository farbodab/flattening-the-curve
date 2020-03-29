import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { ConnectComponent } from 'src/app/pages/connect/connect.component';
import { ResourcesComponent } from 'src/app/pages/resources/resources.component';
import { StoryComponent } from 'src/app/pages/story/story.component';
import { AnalysisComponent } from 'src/app/pages/analysis/analysis.component';
import { DataComponent } from 'src/app/pages/data/data.component';


const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'data', component:DataComponent},
  {path:'team', component:StoryComponent},
  {path:'resources', component:ResourcesComponent},
  {path:'connect', component:ConnectComponent},
  {path:'analysis', component:AnalysisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
