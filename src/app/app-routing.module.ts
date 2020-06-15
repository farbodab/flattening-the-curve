import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { ConnectComponent } from 'src/app/pages/connect/connect.component';
import { ResourcesComponent } from 'src/app/pages/resources/resources.component';
import { StoryComponent } from 'src/app/pages/story/story.component';
import { AnalysisComponent } from 'src/app/pages/analysis/analysis.component';
import { DataComponent } from 'src/app/pages/data/data.component';
import { OutreachComponent } from 'src/app/pages/outreach/outreach.component';
import { BlogComponent } from './pages/blog/blog.component';
import { GridComponent } from './pages/grid/grid.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'data', component: DataComponent },
  { path: 'team', component: StoryComponent },
  { path: 'resources', component: ResourcesComponent },
  //{ path: 'connect', component: ConnectComponent },
  { path: 'outreach', component: OutreachComponent },
  { path: 'blog', component: BlogComponent },
  {
    path: 'dashboard', component: GridComponent, children: [
      { path: 'the_district_of_algoma', component: GridComponent},
      { path: 'brant_county', component: GridComponent },
      { path: 'durham_regional', component: GridComponent },
      { path: 'grey_bruce', component: GridComponent },
      { path: 'haldimand_norfolk', component: GridComponent },
      { path: 'haliburton_kawartha_pine_ridge_district', component: GridComponent },
      { path: 'halton_regional', component: GridComponent },
      { path: 'city_of_hamilton', component: GridComponent },
      { path: 'hastings_and_prince_edward_counties', component: GridComponent },
      { path: 'huron_county', component: GridComponent },
      { path: 'chatham_kent', component: GridComponent },
      { path: 'kingston_frontenac_and_lennox_and_addington', component: GridComponent },
      { path: 'lambton', component: GridComponent },
      { path: 'leeds_grenville_and_lanark_district', component: GridComponent },
      { path: 'middlesex_london', component: GridComponent },
      { path: 'niagara_regional_area', component: GridComponent },
      { path: 'north_bay_parry_sound_district', component: GridComponent },
      { path: 'northwestern', component: GridComponent },
      { path: 'city_of_ottawa', component: GridComponent },
      { path: 'peel_regional', component: GridComponent },
      { path: 'perth_district', component: GridComponent },
      { path: 'peterborough_county_city', component: GridComponent },
      { path: 'porcupine', component: GridComponent },
      { path: 'renfrew_county_and_district', component: GridComponent },
      { path: 'the_eastern_ontario', component: GridComponent },
      { path: 'simcoe_muskoka_district', component: GridComponent },
      { path: 'sudbury_and_district', component: GridComponent },
      { path: 'thunder_bay_district', component: GridComponent },
      { path: 'timiskaming', component: GridComponent },
      { path: 'waterloo', component: GridComponent },
      { path: 'wellington_dufferin_guelph', component: GridComponent },
      { path: 'windsor_essex_county', component: GridComponent },
      { path: 'york_regional', component: GridComponent },
      { path: 'southwestern', component: GridComponent },
      { path: 'city_of_toronto', component: GridComponent },
      { path: 'ontario', component: GridComponent }
    ]
  },
{
  path: 'analysis',
    component: AnalysisComponent,
    children:[
      {
        path: ':viz', //:type is dynamic here
        component: AnalysisComponent
      }
    ]

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
