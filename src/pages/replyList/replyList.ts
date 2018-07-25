import { Component, ViewChild, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ApiProvider } from '../../core/api';
import * as convert from '../../core/convert';
import { BaseListPage } from '../../base/BaseListPage';

@Component({
    selector: 'page-reply-list',
    templateUrl: 'replyList.html'
})
export class ReplyListPage extends BaseListPage {
    threadId: string;
    lastReplyId: string;
    constructor(navParams: NavParams, private apiProvider: ApiProvider) {
        super(navParams.data);
        let params = navParams.data;
        this.threadId = params.threadId;
    }

    ngOnInit() {
        super.ngOnInit();
        let self = this;
        this.myContentList.getData = async function () {
            if (!self.threadId) {
                throw new Error('未看过任何串');
            }
            let data = await self.apiProvider.replyListGet(self.islandCode, self.threadId, self.myContentList.page);
            let convertData = convert.replyListConvert(self.islandCode, data);
            let replys = convertData.replys;

            let addPageInfo = true;
            // let addPageInfo = false;
            // if (self.lastReplyId) {
            //     let idx = replys.findIndex(ele => ele.id == this.lastReplyId);
            //     if (idx >= 0)
            //         replys = replys.splice(idx + 1);
            //     else if (replys.length)
            //         addPageInfo = true;
            // } else {
            //     addPageInfo = true;
            // }
            // if (replys.length)
            //     this.lastReplyId = replys[replys.length - 1].id;
            let returnData: { itemType: string, content: any }[] = [];
            replys.forEach(ele => {
                returnData.push({ itemType: 'reply', content: ele });
            });
            if (self.myContentList.page >= convertData.totalPage) {
                self.myContentList.infiniteScroll.enabled = false;
                self.myContentList.msg = '已经没有了';
            }
            if (addPageInfo) {
                let pageInfo = { itemType: 'info', content: `${self.myContentList.page}/${convertData.totalPage}` };
                returnData.unshift(pageInfo);
                self.myContentList.page++;
            }
            return returnData;
        };
    }
    refresh(threadId) {
        if (threadId) {
            this.threadId = threadId;
            this.myContentList.myTitle = `No.${threadId}`;
        };
        this.lastReplyId = '';
        this.myContentList.refresh();
    }
}
