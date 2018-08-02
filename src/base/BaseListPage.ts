import { MyContentListComponent } from "../components/my-content-list/my-content-list";
import { ViewChild, OnInit } from "@angular/core";

export class BaseListPage implements OnInit {
    protected onChildClick: Function;
    private onBackClick: Function;
    @ViewChild(MyContentListComponent) myContentList: MyContentListComponent;
    title: string;
    get items() {
        return this.myContentList ? this.myContentList.items : [];
    }
    islandCode: string;
    constructor(params) {
        this.title = params.title || '';
        this.islandCode = params.islandCode;
        this.onBackClick = params.onBackClick;
        this.onChildClick = params.onChildClick;
    }

    ngOnInit() {
        let self = this;
        this.myContentList.myContent.onBackClick.subscribe(function () {
            self.onBackClick && self.onBackClick();
        });
    }
}