import { Component, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { Button } from 'ionic-angular';

/**
 * Generated class for the MyContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'my-content',
    templateUrl: 'my-content.html'
})
export class MyContentComponent {
    @Input() myTitle: string;
    @Output() onBackClick = new EventEmitter();
    constructor() {
    }

    doBackClick() {
        this.onBackClick.emit();
    }
}
