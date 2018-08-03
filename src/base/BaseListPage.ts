import { MyContentListComponent } from "../components/my-content-list/my-content-list";
import { ViewChild, OnInit } from "@angular/core";
import { BasePage } from "./BasePage";

export class BaseListPage extends BasePage implements OnInit {
    protected onChildClick: Function;
    @ViewChild(MyContentListComponent) myContentList: MyContentListComponent;
    get items() {
        return this.myContentList ? this.myContentList.items : [];
    }
    islandCode: string;
    constructor(params) {
        super(params);
        this.onChildClick = params.onChildClick;
    }

    ngOnInit() {
        let self = this;
        this.myContentList.myContent.onBackClick.subscribe(function () {
            self.onBackClick && self.onBackClick();
        });
    }
}