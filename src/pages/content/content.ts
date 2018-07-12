import { Component, ViewChild, OnInit } from '@angular/core';
import { Refresher, InfiniteScroll, NavParams, ToastController, Toast } from 'ionic-angular';
import { ApiProvider } from '../../core/Api';

@Component({
    selector: 'page-content',
    templateUrl: 'content.html'
})
export class ContentPage implements OnInit {
    @ViewChild(Refresher) refresher: Refresher;
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll
    //@ViewChild('refresher', { read: Refresher }) refresher2: Refresher;
    title: string;
    items = [];
    noMorePage = false;
    page = 1;
    toast: Toast;
    constructor(navParams: NavParams, private apiProvider: ApiProvider, private toastCtrl: ToastController) {
        this.title = navParams.data.title || '';
        this.toast = this.toastCtrl.create({
            duration: 3000,
            position: 'top'
        });
    }

    ngOnInit() {
        this.refresher._beginRefresh();
    }

    async doRefresh(refresher: Refresher) {
        this.infiniteScroll.enabled = true;
        this.page = 1;
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

    async loadData(): Promise<any[]> {
        let data;
        try {
            data = await this.apiProvider.test(4, this.page);
        } catch (e) {
            this.toast.setMessage(e.message)
            this.toast.present();
        }
        this.page++;
        return data;
    }
}
