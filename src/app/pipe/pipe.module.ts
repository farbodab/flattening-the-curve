import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { StringFilterByPipe } from "./pipes/filterPipe.pipe"; 

@NgModule({
  declarations: [StringFilterByPipe],
  imports: [CommonModule],
  exports: [StringFilterByPipe]
})

export class MainPipe{}