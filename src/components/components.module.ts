import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyContentComponent } from './my-content/my-content';
import { MyContentListComponent } from './my-content-list/my-content-list';
import { MyListItemComponent } from './my-list-item/my-list-item';
@NgModule({
    declarations: [
        MyContentComponent,
        MyContentListComponent,
        MyListItemComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        MyContentComponent,
        MyContentListComponent,
        MyListItemComponent
    ]
})
export class ComponentsModule { }
