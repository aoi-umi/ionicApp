import { Component, ErrorHandler, Injectable } from '@angular/core';
import { Platform, ToastController, Toast } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
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
    constructor(private toastCtrl: ToastController) {
    }
    handleError(err: any): void {
        console.log(err);
        this.toastCtrl
            .create({
                duration: 3000,
                position: 'top'
            })
            .setMessage(err.message)
            .present();
        // do something with the error
    }
}



