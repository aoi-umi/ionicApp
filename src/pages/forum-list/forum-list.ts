import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../core/db';
import { IslandConfig, Group, ForumModel } from '../../core/config';
import { BasePage } from '../../base/BasePage';

/**
 * Generated class for the ForumListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-forum-list',
    templateUrl: 'forum-list.html',
})
export class ForumListPage extends BasePage {
    list: Array<Group<ForumModel>>;
    searchText: string;
    private _list: Array<Group<ForumModel>>;
    constructor(navParams: NavParams, private db: DatabaseProvider) {
        super(navParams.data);
        this._list = this.list = IslandConfig[this.islandCode].Groups;
    }

    onSearchInput() {
        if (!this.searchText) {
            this.list = this._list;
            return;
        }
        let group = {
            GroupName: '搜索结果',
            Models: []
        };
        this._list.forEach(g => {
            g.Models.forEach(m => {
                if (m.forumName.indexOf(this.searchText) >= 0)
                    group.Models.push(m);
            });
        });
        this.list = [group];
    }
    onSearchCancel() {
        this.list = this._list;
    }

    doForumClick(m: ForumModel) {
        console.log(m);
    }
}
