import { Component, ViewChild } from '@angular/core';
import { Tabs, Tab } from 'ionic-angular';

import { IslandsCode } from '../../core/config';
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
            { menuId: 1, title: 'A', islandCode: IslandsCode.A },
            { menuId: 2, title: 'B', islandCode: IslandsCode.Beitai }
        ];
    }

    doChange(tab: Tab) {
        let t = tab._views[0].instance as HomePage;
        t.menu.enable(true);
    }
}


