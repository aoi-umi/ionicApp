import { Component, ViewChild, OnInit } from '@angular/core';
import { Menu, Tabs, MenuToggle, NavParams, Button } from 'ionic-angular';
import { ContentPage } from '../content/content';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    @ViewChild(Tabs) tabs: Tabs;
    @ViewChild(Menu) menu: Menu;
    @ViewChild(MenuToggle) menuToggle: MenuToggle;
    @ViewChild('menuToggleBtn', { read: Button }) menuToggleBtn: Button;

    pages: Array<PageModel>;
    title: string;
    menuId: any;
    constructor(navParams: NavParams) {
        this.menuId = navParams.data.menuId || '';
        this.pages = [
            { component: ContentPage, params: { title: 'Page One' } },
            { component: ContentPage, params: { title: 'Page Two' } }
        ];
    }

    ngOnInit() {
        this.tabs.setTabbarHidden(true);
        this.openPage(this.pages[0], 0);

        //menu-content-open 这个类会导致列表显示出问题，将其移除
        let menu = this.menu;
        menu['_oriAfter'] = menu['_after'];
        menu['_after'] = function () {
            this._oriAfter.apply(this, arguments);
            this._cntEle.classList.remove('menu-content-open');
        }.bind(menu);
    }

    openPage(page: PageModel, index: number) {
        this.title = page.params.title;
        this.tabs.select(index);
    }
}

type PageModel = {
    params: {
        title: string
    },
    component: any
};