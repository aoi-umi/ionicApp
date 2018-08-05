import { Component, ViewChild, OnInit } from '@angular/core';
import { Menu, Tabs, NavParams, AlertController } from 'ionic-angular';
import { IslandConfigModel, IslandConfig, ForumModel } from '../../core/config';
import { ThreadListPage } from '../threadList/threadList';
import { ReplyListPage } from '../replyList/replyList';
import { MarkListPage } from '../markList/markList';
import { ThreadModel } from '../../model/myModel';
import { ForumListPage } from '../forum-list/forum-list';


type PageModel = {
    params: {
        title: string,
        islandCode: string,
    },
    component: any,
    type: string,
};

let PageType = {
    home: 'home',
    reply: 'reply',
    mark: 'mark',
    myreply: 'myreply',
    image: 'image',
    forums: 'forums',
    gotothread: 'gotothread',
    setting: 'setting',
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    @ViewChild(Tabs) tabs: Tabs;
    @ViewChild(Menu) menu: Menu;

    pages: Array<any>;
    menuList: Array<any>;
    menuId: any;
    islandConfig: IslandConfigModel;
    currPageType: string;
    currThreadId: string = '';
    isHome = true;
    currForum: ForumModel;
    constructor(navParams: NavParams, private alertCtrl: AlertController) {
        let self = this;
        let data = navParams.data;
        this.menuId = data.menuId || '';
        this.islandConfig = IslandConfig[data.islandCode];
        let defaultParams = {
            islandCode: this.islandConfig.IslandCode,
            onBackClick: this.doBackClick.bind(this),
        };
        this.currForum = IslandConfig[this.islandConfig.IslandCode].Groups[0].Models[0];
        this.pages = [
            {
                component: ThreadListPage, type: PageType.home,
                params: {
                    ...defaultParams, title: 'Home', onChildClick: function (thread: ThreadModel) {
                        self.doMenuClick({ type: PageType.reply }, { threadId: thread.id });
                    },
                    forum: this.currForum
                }
            },
            {
                component: ReplyListPage, type: PageType.reply, notInMenu: true,
                params: { ...defaultParams, title: 'reply' }
            },
            {
                component: MarkListPage, type: PageType.mark,
                params: {
                    ...defaultParams, title: '收藏', onChildClick: function (thread: ThreadModel) {
                        self.doMenuClick({ type: PageType.reply }, { threadId: thread.id });
                    }
                }
            },
            {
                component: null, type: PageType.myreply,
                params: { ...defaultParams, title: '回复' }
            },
            {
                component: null, type: PageType.image,
                params: { ...defaultParams, title: '图片' }
            },
            {
                component: ForumListPage, type: PageType.forums,
                params: {
                    ...defaultParams, title: '板块', onForumClick: function (forum: ForumModel) {
                        self.doMenuClick({ type: PageType.home }, { forum: forum });
                    }
                }
            },
            {
                type: PageType.gotothread,
                params: { ...defaultParams, title: '跳转' }
            },
            {
                component: null, type: PageType.setting,
                params: { ...defaultParams, title: '设置' }
            },
        ];
        this.menuList = [];
        this.pages.forEach(ele => {
            if (!ele.notInMenu)
                this.menuList.push({ type: ele.type, title: ele.params.title });
        });
    }

    ngOnInit() {
        this.tabs.setTabbarHidden(true);
        this.doMenuClick(this.menuList[0]);
    }

    doMenuClick(menu, opt?) {
        switch (menu.type) {
            case PageType.gotothread:
                this.confirmGoToThread();
                break;
            default:
                let params: any = {
                    type: menu.type,
                };
                if (this.currPageType == PageType.reply && menu.type == PageType.home) {
                    params.type = PageType.reply;
                    params.threadId = this.currThreadId;
                }
                params = { ...params, ...opt };

                let idx = this.pages.findIndex(ele => ele.type == params.type);
                this.tabs.select(idx).then(() => {
                    this.onPageSelected(params);
                });
        }
    }

    doBackClick() {
        let backToPage = PageType.home;
        let params: any = {};
        if (this.isHome && this.currPageType == PageType.home) {
            backToPage = PageType.reply;
            params.threadId = this.currThreadId;
        }
        params.type = backToPage;

        let idx = this.pages.findIndex(ele => ele.type == params.type);
        this.tabs.select(idx).then(() => {
            this.onPageSelected(params);
        });
    }

    private confirmGoToThread() {
        let alert = this.alertCtrl.create({
            title: '请输入串号',
            inputs: [{
                name: 'threadId',
            }],
            buttons: [{
                text: '取消'
            }, {
                text: '跳转',
                handler: (params) => {
                    let threadId = params.threadId.trim();
                    if (threadId) {
                        let idx = this.pages.findIndex(ele => ele.type == PageType.reply);
                        this.tabs.select(idx).then(() => {
                            this.onPageSelected({ type: PageType.reply, threadId: threadId });
                        })
                    }
                }
            }]
        });
        alert.present();
    }

    private onPageSelected(opt) {
        let p = this.pages.find(ele => ele.type == opt.type);
        if (!p || !p.component)
            throw new Error('未实现');

        if (opt.threadId)
            this.currThreadId = opt.threadId;
        this.currPageType = opt.type;
        if (this.currPageType == PageType.home)
            this.isHome = true;
        else if (this.currPageType == PageType.reply)
            this.isHome = false;
        let selected = this.tabs.getSelected();
        if (selected) {
            let page = selected._views[0].instance;
            if (opt.type == PageType.home) {
                let p = page as ThreadListPage;
                p.setForum(opt.forum);
            }
            else if (opt.type == PageType.reply) {
                let p = page as ReplyListPage;
                if (opt.threadId != p.threadId)
                    p.refresh(opt.threadId);
            }
        }
    }
}