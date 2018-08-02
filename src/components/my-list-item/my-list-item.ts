import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the ListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'my-list-item',
    templateUrl: 'my-list-item.html'
})
export class MyListItemComponent {

    @Input() model: any;
    @Output() onClick = new EventEmitter();

    constructor() {
    }

    doClick(item) {
        this.onClick.emit(item);
    }

}
