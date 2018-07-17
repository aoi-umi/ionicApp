import { Component, ViewChild, OnInit } from '@angular/core';
import { Menu, Tabs, MenuToggle, NavParams, Button, AlertController, MenuType } from 'ionic-angular';
import { ThreadListPage } from '../threadList/threadList';
import { IslandConfigModel, IslandConfig } from '../../core/config';
import { ReplyListPage } from '../replyList/replyList';


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
    @ViewChild(MenuToggle) menuToggle: MenuToggle;
    @ViewChild('menuToggleBtn', { read: Button }) menuToggleBtn: Button;

    pages: Array<any>;
    menuList: Array<any>;
    title: string;
    menuId: any;
    islandConfig: IslandConfigModel;
    constructor(navParams: NavParams, private alertCtrl: AlertController) {
        let self = this;
        this.menuId = navParams.data.menuId || '';
        this.islandConfig = IslandConfig[navParams.data.islandCode];
        let defaultParams = { islandCode: this.islandConfig.IslandCode };
        this.pages = [
            {
                component: ThreadListPage, type: PageType.home,
                params: {
                    ...defaultParams, title: 'Home', onChildClick: function (thread) {
                        self.doMenuClick({ type: PageType.reply }, { threadId: thread.id });
                    }
                }
            },
            {
                component: ReplyListPage, type: PageType.reply, notInMenu: true,
                params: { ...defaultParams, title: 'reply' }
            },
            {
                component: null, type: PageType.mark,
                params: { ...defaultParams, title: '收藏' }
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
                component: null, type: PageType.forums,
                params: { ...defaultParams, title: '板块' }
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

        //menu-content-open 这个类会导致列表显示出问题，将其移除
        let menu = this.menu;
        menu['_oriAfter'] = menu['_after'];
        menu['_after'] = function () {
            this._oriAfter.apply(this, arguments);
            this._cntEle.classList.remove('menu-content-open');
        }.bind(menu);
    }

    doMenuClick(menu, opt?) {
        this.title = menu.title;
        switch (menu.type) {
            case PageType.gotothread:
                this.confirmGoToThread();
                break;
            default:
                let idx = this.pages.findIndex(ele => ele.type == menu.type);
                this.tabs.select(idx).then(() => {
                    this.onPageSelected({ type: menu.type, ...opt });
                });
        }
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
        let selected = this.tabs.getSelected();
        if (selected) {
            let params = selected.rootParams;
            let page = selected._views[0].instance;
            if (opt.type == PageType.reply) {
                this.title = 'No.' + opt.threadId;
                let p = page as ReplyListPage;
                if (opt.threadId != p.threadId)
                    p.refresh(opt.threadId);
            } else {
                this.title = params.title;
            }
        }
    }
}