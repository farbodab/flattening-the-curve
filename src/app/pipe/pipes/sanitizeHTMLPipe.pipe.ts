import { Component, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml  } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {}
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}