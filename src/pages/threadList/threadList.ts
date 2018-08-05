import { Component, ViewChild, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ApiProvider } from '../../core/api';
import * as convert from '../../core/convert';
import { BaseListPage } from '../../base/BaseListPage';
import { ForumModel, IslandConfig } from '../../core/config';

@Component({
    selector: 'page-thread-list',
    templateUrl: 'threadList.html'
})
export class ThreadListPage extends BaseListPage {

    forum: ForumModel;
    constructor(navParams: NavParams, private apiProvider: ApiProvider) {
        super(navParams.data);
        let params = navParams.data;
        this.forum = params.forum;
    }

    ngOnInit() {
        let self = this;
        super.ngOnInit();
        this.setForum(this.forum);
        this.myContentList.getData = async function () {
            let data = await self.apiProvider.threadListGet(self.islandCode, self.forum.forumValue, self.myContentList.page);
            let returnData: {
                itemType: string,
                content: any,
            }[] = [];
            data.forEach(ele => {
                let convertData = convert.threadConvert(self.islandCode, ele);
                returnData.push({
                    itemType: 'thread',
                    content: convertData,
                });
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

    setForum(forum: ForumModel) {
        if (!forum)
            return;
        this.forum = forum;
        this.title = forum.forumName;
    }
}
