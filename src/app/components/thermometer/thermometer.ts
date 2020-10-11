import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-thermometer',
    templateUrl: './thermometer.html',
    styleUrls: ['./thermometer.scss']
})

export class ThermometerComponent implements OnInit {
    is_full: boolean = true;
    window_subscription: Subscription;

    constructor(private host_service: HostService) {
        this.refresh_layout(window.innerWidth);
    }

    ngOnInit() {
        this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
            this.refresh_layout(window.innerWidth);
        });
    }

    private refresh_layout(width) {
        this.is_full = window.innerWidth >= 1024 ? true : false;
    }
}
