import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { Feed } from '../../interfaces/feed';
import { NgMediumService } from '../../services/medium-feed.service';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { HostService } from '../../services/host.service';

@Component({
    selector: "app-blog-feed",
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
    @Output()
    errorStream = new EventEmitter<Error>();
    @Input()
    set feedUrl(feedUrl: string) {
        this.fetchFeed(feedUrl);
    }
    @Input()
    feed: Feed;
    constructor(private host_service: HostService, private service: NgMediumService, private api_service: ApiService) {
        this.refresh_layout(window.innerWidth);
    }

    expandedArray: boolean[];
    is_full = true;
    twitterObj: any;
    window_subscription: Subscription;

    ngOnInit() {
        this.window_subscription = this.host_service.onWindowResize.subscribe(window => {
            this.refresh_layout(window.innerWidth);
        });

        this.fetchFeed("https://medium.com/feed/@howsmyflattening");
        //this.fetchTwitterFeed();
    }

    // fetchTwitterFeed() {
    //     this.api_service.get_twitter_obj().subscribe(
    //         data => {
    //             this.twitterObj = data;
    //             console.log(this.twitterObj);
    //         },
    //         error => {
    //             console.log('error');
    //             //console.error(error);
    //         }
    //     );
    // }

    redirect(url: string) {
        //window.location.href = url;
        window.open(url, '_blank');
    }

    expandContentToggle(index: number) {
        this.expandedArray[index] = !this.expandedArray[index];
    }

    private fetchFeed(url: string): void {
        this.service.fetchFeed(url).then(
            res => {
                this.feed = res;
                let expandedPlaceholder = [];
                console.log(this.feed.items);
                this.feed.items.forEach((element, index) => {
                    element.formatedPubDate = moment(element.pubDate).format('MMM DD, YYYY');
                    expandedPlaceholder[index] = false;
                });
                this.expandedArray = expandedPlaceholder;
            },
            err => this.errorStream.emit(err),
        );

    }

    private refresh_layout(width) {
        this.is_full = window.innerWidth >= 1024 ? true : false;
    }
}
