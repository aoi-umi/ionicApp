import { Component, ViewChild, OnInit } from '@angular/core';
import { Menu, Tabs, MenuToggle, NavParams, Button, AlertController, MenuType } from 'ionic-angular';
import { ThreadListPage } from '../threadList/threadList';
import { IslandConfigModel, islandConfig } from '../../core/config';
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
        this.islandConfig = islandConfig[navParams.data.islandCode];
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
                component: ThreadListPage, type: PageType.mark,
                params: { ...defaultParams, title: '收藏' }
            },
            {
                component: ThreadListPage, type: PageType.myreply,
                params: { ...defaultParams, title: '回复' }
            },
            {
                component: ThreadListPage, type: PageType.image,
                params: { ...defaultParams, title: '图片' }
            },
            {
                component: ThreadListPage, type: PageType.forums,
                params: { ...defaultParams, title: '板块' }
            },
            {
                component: ThreadListPage, type: PageType.gotothread,
                params: { ...defaultParams, title: '跳转' }
            },
            {
                component: ThreadListPage, type: PageType.setting,
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
        switch (menu.type) {
            case PageType.gotothread:
                this.confirmGoToThread();
                break;
            default:
                let idx = this.pages.findIndex(ele => ele.type == menu.type);
                if (menu.type == PageType.reply) {
                    this.pages[idx].params.threadId = opt.threadId;
                    this.title = 'No.' + opt.threadId;
                } else {
                    this.title = menu.title;
                }
                this.tabs.select(idx);
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
                        this.pages[idx].params.threadId = threadId;
                        this.tabs.select(idx);
                    }
                }
            }]
        });
        alert.present();
    }
}