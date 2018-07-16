import { Component, ViewChild, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ApiProvider } from '../../core/api';
import { MyContentListComponent } from '../../components/my-content-list/my-content-list';

@Component({
    selector: 'page-reply-list',
    templateUrl: 'replyList.html'
})
export class ReplyListPage implements OnInit {
    @ViewChild(MyContentListComponent) myContentList: MyContentListComponent;
    title: string;
    get items() {
        return this.myContentList ? this.myContentList.items : [];
    }
    islandCode: string;
    threadId: string;
    constructor(navParams: NavParams, private apiProvider: ApiProvider) {
        let params = navParams.data;
        this.title = params.title || '';
        this.threadId = params.threadId;
        this.islandCode = params.islandCode;
    }

    ngOnInit() {
        let self = this;
        this.myContentList.getData = async function () {
            let data = await self.apiProvider.replyListGet(self.islandCode, self.threadId, self.myContentList.page);
            data = data.replys;
            let pageInfo = { itemType: 'info', msg: `${self.myContentList.page}/` };
            return [pageInfo, ...data];
        };
        this.myContentList.refresh();
    }
}
