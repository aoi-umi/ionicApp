import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { MyApp, MyErrorHandler } from './app.component';

import { ApiProvider } from '../core/api';
import { CommonProvider } from '../core/common';
import { DatabaseProvider } from '../core/db';

import { ComponentsModule } from '../components/components.module';

import { ThreadListPage } from '../pages/threadList/threadList';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ReplyListPage } from '../pages/replyList/replyList';
import { MarkListPage } from '../pages/markList/markList';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        ThreadListPage,
        ReplyListPage,
        MarkListPage,
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
        MarkListPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: MyErrorHandler },
        ApiProvider,
        CommonProvider,
        DatabaseProvider,
    ]
})
export class AppModule { }
