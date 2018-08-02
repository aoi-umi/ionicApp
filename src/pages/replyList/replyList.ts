import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ApiProvider } from '../../core/api';
import * as convert from '../../core/convert';
import { BaseListPage } from '../../base/BaseListPage';
import { DatabaseProvider } from '../../core/db';
import { ThreadModel } from '../../model/myModel';

@Component({
    selector: 'page-reply-list',
    templateUrl: 'replyList.html'
})
export class ReplyListPage extends BaseListPage {
    threadId: string;
    lastReplyId: string;
    mark: boolean;
    thread: ThreadModel;
    constructor(navParams: NavParams, private apiProvider: ApiProvider, private db: DatabaseProvider) {
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
            delete convertData.replys;
            if (!self.thread || self.threadId != convertData.id) {
                self.thread = convertData;
            }

            let returnData: { itemType: string, content: any }[] = [];
            replys.forEach(ele => {
                returnData.push({ itemType: 'reply', content: ele });
            });
            if (self.myContentList.page >= convertData.totalPage) {
                self.myContentList.infiniteScroll.enabled = false;
                self.myContentList.msg = '已经没有了';
            }
            let pageInfo = { itemType: 'info', content: `${self.myContentList.page}/${convertData.totalPage}` };
            returnData.unshift(pageInfo);
            self.myContentList.page++;

            if (!self.items.length)
                returnData.unshift({ itemType: 'thread', content: convertData });
            return returnData;
        };
    }
    refresh(threadId) {
        if (threadId) {
            if (this.threadId != threadId) {
                this.thread = this.db.markModel.getData((ele) => {
                    return ele.islandCode == this.islandCode && ele.id == threadId
                })[0];
                this.mark = !!this.thread;
            }
            this.threadId = threadId;
            this.myContentList.myTitle = `No.${threadId}`;
        };
        this.lastReplyId = '';
        this.myContentList.refresh();
    }
    doMarkClick() {
        if (!this.threadId)
            throw new Error('无法收藏');
        if (!this.mark) {
            let result = this.db.markModel.setData(this.thread);
            if (result)
                this.mark = true;
        } else {
            this.db.markModel.removeData(this.thread._id);
            this.mark = false;
        }
    }
}
