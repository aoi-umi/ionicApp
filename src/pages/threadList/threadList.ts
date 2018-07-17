import { Component, ViewChild, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ApiProvider } from '../../core/api';
import * as convert from '../../core/convert';
import { MyContentListComponent } from '../../components/my-content-list/my-content-list';

@Component({
    selector: 'page-thread-list',
    templateUrl: 'threadList.html'
})
export class ThreadListPage implements OnInit {
    @ViewChild(MyContentListComponent) myContentList: MyContentListComponent;
    private onChildClick: Function;
    title: string;
    get items() {
        return this.myContentList ? this.myContentList.items : [];
    }
    islandCode: string;
    constructor(navParams: NavParams, private apiProvider: ApiProvider) {
        let params = navParams.data
        this.title = params.title || '';
        this.islandCode = params.islandCode;
        this.onChildClick = params.onChildClick;
    }

    ngOnInit() {
        let self = this;
        this.myContentList.getData = async function () {
            let data = await self.apiProvider.threadListGet(self.islandCode, 4, self.myContentList.page);
            let returnData: { itemType: string, content: any }[] = [];
            data.forEach(ele => {
                let convertData = convert.threadConvert(self.islandCode, ele);
                returnData.push({ itemType: 'thread', content: convertData });
            });
            let pageInfo = { itemType: 'info', content: self.myContentList.page };
            returnData.unshift(pageInfo);

            self.myContentList.page++;
            return returnData;
        };
        //this.myContentList.refresh();
    }

    doClick(thread) {
        this.onChildClick && this.onChildClick(thread);
    }
}
