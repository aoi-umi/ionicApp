import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiProvider } from '../core/Api';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, apiProvider: ApiProvider, private toastCtrl: ToastController) {
        platform.ready().then(async () => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.            
            statusBar.styleDefault();
            splashScreen.hide();
            try {
                let test = await apiProvider.test();
                console.log(test);
            } catch (e) {
                let toast = toastCtrl.create({
                    message: 'just a test:' + e.message,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        });
    }
}



