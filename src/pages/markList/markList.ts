import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { BaseListPage } from '../../base/BaseListPage';
import { DatabaseProvider } from '../../core/db';
import { fixConvert } from '../../core/convert';

@Component({
    selector: 'page-mark-list',
    templateUrl: 'markList.html'
})
export class MarkListPage extends BaseListPage {
    constructor(navParams: NavParams, private db: DatabaseProvider) {
        super(navParams.data);
    }

    ngOnInit() {
        super.ngOnInit();
        let self = this;
        this.myContentList.getData = async function () {
            let list = self.db.markModel.getData((ele) => ele.islandCode == self.islandCode);
            let returnData = list.map(ele => {
                fixConvert(self.islandCode, ele);
                return { itemType: 'thread', content: ele };
            });
            self.myContentList.infiniteScroll.enabled = false;
            return returnData;
        };
        self.refresh();
    }
    refresh() {
        this.myContentList.refresh();
    }

    doClick(thread) {
        this.onChildClick && this.onChildClick(thread);
    }
}
