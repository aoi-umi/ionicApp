import { Component, ViewChild, OnInit } from '@angular/core';
import { Refresher, InfiniteScroll, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../core/api';
import { IslandConfigModel, islandConfig } from '../../core/config';

@Component({
    selector: 'page-content',
    templateUrl: 'content.html'
})
export class ContentPage implements OnInit {
    @ViewChild(Refresher) refresher: Refresher;
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    private title: string;
    private items = [];
    private noMorePage = false;
    private page = 1;
    private msg: string;
    islandConfig: IslandConfigModel;
    constructor(navParams: NavParams, private apiProvider: ApiProvider) {
        this.title = navParams.data.title || '';
        this.islandConfig = islandConfig[navParams.data.islandCode];
    }

    ngOnInit() {
        //this.refresher._beginRefresh();
    }

    async doRefresh() {
        this.infiniteScroll.enabled = true;
        this.page = 1;
        this.items = [];
        try {
            let data = await this.loadData();
            this.items = [...this.items, ...data];
        } catch (e) {
            this.msg = e.message;
        } finally {
            this.refresher.complete();
        }
    }

    async doInfinite() {
        try {
            let data = await this.loadData();
            this.items = [...this.items, ...data];
            //if(data.length < )
        } catch (e) {
            this.msg = e.message;
        } finally {
            this.infiniteScroll.complete();
        }
    }

    async loadData(): Promise<any[]> {
        this.msg = '';
        let data = await this.apiProvider.test(this.islandConfig.IslandCode, 4, this.page);
        let pageInfo = { itemType: 'info', msg: this.page };
        this.items.push(pageInfo);
        this.page++;
        return data;
    }
}
