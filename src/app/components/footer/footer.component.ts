import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit, AfterViewInit {
    embedLink: string;
    is_full: boolean = true;
    window_subscription: Subscription;

    constructor(private host_service: HostService) {
        this.embedLink = "https://twitter.com/howsmyflattenON?ref_src=twsrc%5Etfw";
        this.refresh_layout(window.innerWidth);
    }

    ngOnInit() {
        this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
            this.refresh_layout(window.innerWidth);
        });
    }

    ngAfterViewInit() {
        (<any>window).twttr.widgets.load();
    }

    private refresh_layout(width) {
        this.is_full = window.innerWidth >= 1024 ? true : false;
    }
}