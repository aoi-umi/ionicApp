import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { MyApp, MyErrorHandler } from './app.component';

import { ThreadListPage } from '../pages/threadList/threadList';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { ApiProvider } from '../core/api';
import { ComponentsModule } from '../components/components.module';
import { ReplyListPage } from '../pages/replyList/replyList';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        ThreadListPage,
        ReplyListPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        ComponentsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        ThreadListPage,
        ReplyListPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: MyErrorHandler },
        ApiProvider
    ]
})
export class AppModule { }
