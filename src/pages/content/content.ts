import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Refresher, InfiniteScroll, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-content',
    templateUrl: 'content.html'
})
export class ContentPage implements OnInit, AfterViewInit {
    @ViewChild(Refresher) refresher: Refresher;
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll
    //@ViewChild('refresher', { read: Refresher }) refresher2: Refresher;
    title: string;
    items = [];
    noMorePage = false;
    constructor(navParams: NavParams) {
        this.title = navParams.data.title || '';
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.refresher._beginRefresh();
    }

    async doRefresh(refresher: Refresher) {
        this.infiniteScroll.enabled = true;

        this.items = [];
        let data = await this.loadData();
        for (let item of data) {
            this.items.push(item);
        }
        refresher.complete();
    }

    async doInfinite(infiniteScroll: InfiniteScroll) {
        let data = await this.loadData();
        for (let item of data) {
            this.items.push(item);
        }
        if (this.items.length > 80)
            this.infiniteScroll.enabled = false;
        infiniteScroll.complete();
    }

    loadData(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let items = [];
                for (var i = 1; i <= 30; i++) {
                    items.push(this.title + (this.items.length + i));
                }
                resolve(items);
            }, 2000);
        })
    }
}
