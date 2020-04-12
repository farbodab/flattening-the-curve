import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { Feed } from '../../interfaces/feed';
import { NgMediumService } from '../../services/medium-feed.service';
import * as moment from 'moment';

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
    constructor(private service: NgMediumService) {
        this.refresh_layout(window.innerWidth);
    }

    expandedArray: boolean[];
    is_full = true;

    ngOnInit() {
        this.fetchFeed("https://medium.com/feed/@obenfine");
        //this.fetchFeed("https://medium.com/feed/@howsmyflattening");
    }

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
