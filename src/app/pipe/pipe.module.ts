import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { StringFilterByPipe } from "./pipes/filterPipe.pipe"; 
import { SafeUrlPipe } from "./pipes/sanitizeURLPipe.pipe";
import { SafeHtmlPipe } from "./pipes/sanitizeHTMLPipe.pipe";

@NgModule({
  declarations: [StringFilterByPipe, SafeUrlPipe, SafeHtmlPipe],
  imports: [CommonModule],
  exports: [StringFilterByPipe, SafeUrlPipe, SafeHtmlPipe]
})

export class MainPipe{}