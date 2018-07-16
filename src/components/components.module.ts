import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyContentComponent } from './my-content/my-content';
import { MyContentListComponent } from './my-content-list/my-content-list';
@NgModule({
    declarations: [
        MyContentComponent,
        MyContentListComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        MyContentComponent,
        MyContentListComponent
    ]
})
export class ComponentsModule { }
