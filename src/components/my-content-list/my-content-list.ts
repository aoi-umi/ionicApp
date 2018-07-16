
import { Component, ViewChild, EventEmitter } from '@angular/core';
import { Refresher, InfiniteScroll } from 'ionic-angular';

/**
 * Generated class for the MyContentListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'my-content-list',
    templateUrl: 'my-content-list.html'
})
export class MyContentListComponent {
    @ViewChild(Refresher) refresher: Refresher;
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    items = [];
    page = 1;
    msg: string;
    constructor() {
    }

    private async doRefresh() {
        this.infiniteScroll.enabled = true;
        this.page = 1;
        this.items = [];
        try {
            await this.loadData();
        } catch (e) {
            this.msg = e.message;
        } finally {
            this.refresher.complete();
        }
    }

    private async doInfinite() {
        try {
            await this.loadData();
        } catch (e) {
            this.msg = e.message;
        } finally {
            this.infiniteScroll.complete();
        }
    }

    private async loadData(): Promise<any> {
        this.msg = '';
        let data = this.getData ? await this.getData() : [];
        this.items = [...this.items, ...data];
        this.page++;
    }
    getData: Function;
    refresh() {
        this.refresher._beginRefresh();
    }
}
