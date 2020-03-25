import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar/';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MaterialModule { }
