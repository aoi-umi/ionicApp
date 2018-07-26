import { Component, ErrorHandler, Injectable } from '@angular/core';
import { Platform, ToastController, Menu } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { CommonProvider } from '../core/common';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        //menu-content-open 这个类会导致列表显示出问题，将其移除
        Menu.prototype['_oriAfter'] = Menu.prototype['_after'];
        Menu.prototype['_after'] = function () {
            this._oriAfter.apply(this, arguments);
            this._cntEle.classList.remove('menu-content-open');
        };

        platform.ready().then(async () => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.            
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}


@Injectable()
export class MyErrorHandler implements ErrorHandler {
    constructor(private common: CommonProvider) {

    }
    handleError(err: any): void {
        console.log(err);
        let message = '';
        message = err.message;
        if (err['rejection'])
            message = err['rejection'].message;
        this.common.showMsg(message);
    }
}



