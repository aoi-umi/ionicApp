import { Component, ViewChild } from '@angular/core';
import { Tabs, Tab } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild('myTabs') tabRef: Tabs;
    tabRoot = HomePage;
    paramsList: Array<any>;
    constructor() {
        this.paramsList = [
            { menuId: 1, title: 1 },
            { menuId: 2, title: 2 }
        ];
    }

    doChange(tab: Tab) {
        let t = tab._views[0].instance as HomePage;
        t.menu.enable(true);
    }
}


