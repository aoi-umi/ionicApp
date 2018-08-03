

export class BasePage {
    protected onBackClick: Function;
    title: string;
    islandCode: string;
    constructor(params) {
        this.title = params.title || '';
        this.islandCode = params.islandCode;
        this.onBackClick = params.onBackClick;
    }
}