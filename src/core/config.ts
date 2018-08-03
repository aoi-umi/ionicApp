export let IslandsCode = {
    A: 'A',
    Beitai: 'Beitai'
};


export class Group<T> {
    GroupName: string;
    Models: Array<T>
}
export class ForumModel {
    forumName?: string;
    forumValue?: string;
    forumGroupId?: string;
}
export class IslandConfigModel {
    Host: string;
    PictureHost: string;
    GetThreadAPI: string;
    GetReplyAPI: string;
    GetRefAPI: string;
    PostThreadAPI: string;
    PostReplyAPI: string;
    PageSize: number;
    IslandCode: string;
    Groups: Array<Group<ForumModel>>;
}
export let IslandConfig: { [key: string]: IslandConfigModel } = {
    [IslandsCode.A]: {
        Host: "//adnmb.com",
        PictureHost: "//img6.nimingban.com/",
        GetThreadAPI: "{0}/Api/showf/id/{1}/page/{2}",
        GetReplyAPI: "{0}/Api/thread/id/{1}/page/{2}",
        GetRefAPI: "{0}/Api/ref?id:{1}",
        PostThreadAPI: "{0}/Home/Forum/doPostThread.html",
        PostReplyAPI: "{0}/Home/Forum/doReplyThread.html",
        PageSize: 19,
        IslandCode: IslandsCode.A,
        Groups: [{
            GroupName: "综合",
            Models: [
                { forumName: "综合版", forumValue: "4", forumGroupId: "" },
                { forumName: "欢乐恶搞", forumValue: "20", forumGroupId: "" },
                { forumName: "推理", forumValue: "11", forumGroupId: "" },
                { forumName: "技术讨论", forumValue: "30", forumGroupId: "" },
                { forumName: "美食", forumValue: "32", forumGroupId: "" },
                { forumName: "喵版", forumValue: "40", forumGroupId: "" },
                { forumName: "音乐", forumValue: "35", forumGroupId: "" },
                { forumName: "校园", forumValue: "56", forumGroupId: "" },
                { forumName: "社畜", forumValue: "110", forumGroupId: "" },
                { forumName: "科学", forumValue: "15", forumGroupId: "" },
                { forumName: "活动", forumValue: "104", forumGroupId: "" },
                { forumName: "文学", forumValue: "103", forumGroupId: "" },
                { forumName: "二次创作", forumValue: "17", forumGroupId: "" },
                { forumName: "姐妹", forumValue: "98", forumGroupId: "" },
                { forumName: "女性向", forumValue: "102", forumGroupId: "" },
                { forumName: "女装", forumValue: "97", forumGroupId: "" },
                { forumName: "日记", forumValue: "89", forumGroupId: "" },
                { forumName: "WIKI", forumValue: "27", forumGroupId: "" },
                { forumName: "都市怪谈", forumValue: "81", forumGroupId: "" },
                { forumName: "买买买", forumValue: "106", forumGroupId: "" },
                { forumName: "活动", forumValue: "104", forumGroupId: "" },
                { forumName: "圈内", forumValue: "96", forumGroupId: "" },
                { forumName: "速报", forumValue: "83", forumGroupId: "" },
            ]
        },
        {
            GroupName: "二次元",
            Models: [
                { forumName: "动画", forumValue: "14", forumGroupId: "" },
                { forumName: "漫画", forumValue: "12", forumGroupId: "" },
                { forumName: "国漫", forumValue: "99", forumGroupId: "" },
                { forumName: "美漫", forumValue: "90", forumGroupId: "" },
                { forumName: "轻小说", forumValue: "87", forumGroupId: "" },
                { forumName: "小说", forumValue: "19", forumGroupId: "" },
                { forumName: "GALGAME", forumValue: "64", forumGroupId: "" },
                { forumName: "VOCALOID", forumValue: "6", forumGroupId: "" },
                { forumName: "东方", forumValue: "5", forumGroupId: "" },
                { forumName: "舰娘", forumValue: "93", forumGroupId: "" },
                { forumName: "LL", forumValue: "101", forumGroupId: "" },
            ]
        },
        {
            GroupName: "游戏",
            Models: [
                { forumName: "游戏综合版", forumValue: "2", forumGroupId: "" },
                { forumName: "守望先锋", forumValue: "109", forumGroupId: "" },
                { forumName: "手游", forumValue: "3", forumGroupId: "" },
                { forumName: "EVE", forumValue: "73", forumGroupId: "" },
                { forumName: "DNF", forumValue: "72", forumGroupId: "" },
                { forumName: "战争雷霆", forumValue: "86", forumGroupId: "" },
                { forumName: "LOL", forumValue: "22", forumGroupId: "" },
                { forumName: "DOTA", forumValue: "70", forumGroupId: "" },
                { forumName: "Steam", forumValue: "107", forumGroupId: "" },
                { forumName: "辐射4", forumValue: "108", forumGroupId: "" },
                { forumName: "GTA5", forumValue: "95", forumGroupId: "" },
                { forumName: "MC", forumValue: "10", forumGroupId: "" },
                { forumName: "音游", forumValue: "34", forumGroupId: "" },
                { forumName: "WOT", forumValue: "51", forumGroupId: "" },
                { forumName: "WOW", forumValue: "44", forumGroupId: "" },
                { forumName: "D3", forumValue: "23", forumGroupId: "" },
                { forumName: "卡牌桌游", forumValue: "45", forumGroupId: "" },
                { forumName: "炉石传说", forumValue: "80", forumGroupId: "" },
                { forumName: "怪物猎人", forumValue: "28", forumGroupId: "" },
                { forumName: "口袋妖怪", forumValue: "38", forumGroupId: "" },
                { forumName: "AC大逃杀", forumValue: "29", forumGroupId: "" },
                { forumName: "索尼", forumValue: "24", forumGroupId: "" },
                { forumName: "任天堂", forumValue: "25", forumGroupId: "" },
                { forumName: "日麻", forumValue: "92", forumGroupId: "" },
            ]
        },
        {
            GroupName: "2.5次元",
            Models: [
                { forumName: "AKB48", forumValue: "16", forumGroupId: "" },
                { forumName: "SNH48", forumValue: "100", forumGroupId: "" },
                { forumName: "眼科", forumValue: "13", forumGroupId: "" },
                { forumName: "声优", forumValue: "55", forumGroupId: "" },
                { forumName: "模型", forumValue: "39", forumGroupId: "" },
            ]
        },
        {
            GroupName: "三次元",
            Models: [
                { forumName: "影视", forumValue: "31", forumGroupId: "" },
                { forumName: "摄影", forumValue: "54", forumGroupId: "" },
                { forumName: "体育", forumValue: "33", forumGroupId: "" },
                { forumName: "军武", forumValue: "37", forumGroupId: "" },
                { forumName: "数码", forumValue: "75", forumGroupId: "" },
                { forumName: "天台", forumValue: "88", forumGroupId: "" },
            ]
        },
        {
            GroupName: "其他",
            Models: [
                { forumName: "询问2", forumValue: "36", forumGroupId: "" },
            ]
        },]
    },
    [IslandsCode.Beitai]: {
        Host: "//tnmb.org",
        PictureHost: "//tnmbstatic.fastmirror.org/Public/Upload/",
        GetThreadAPI: "{0}/Api/showf/id/{1}/page/{2}",
        GetReplyAPI: "{0}/Api/thread/id/{1}/page/{2}",
        GetRefAPI: "{0}/Api/ref?id:{1}",
        PostThreadAPI: "{0}/home/forum/dopostthread.html",
        PostReplyAPI: "{0}/home/forum/doreplythread.html",
        PageSize: 19,
        IslandCode: IslandsCode.Beitai,
        Groups: [{
            GroupName: "板块",
            Models: [
                { forumName: "综合", forumValue: "1", forumGroupId: "" },
                { forumName: "技术", forumValue: "2", forumGroupId: "" },
                { forumName: "二次创作", forumValue: "3", forumGroupId: "" },
                { forumName: "动画漫画", forumValue: "4", forumGroupId: "" },
                { forumName: "值班室", forumValue: "5", forumGroupId: "" },
                { forumName: "游戏", forumValue: "6", forumGroupId: "" },
                { forumName: "欢乐恶搞", forumValue: "7", forumGroupId: "" },
                { forumName: "小说", forumValue: "11", forumGroupId: "" },
                { forumName: "数码音乐", forumValue: "13", forumGroupId: "" },
                { forumName: "射影", forumValue: "14", forumGroupId: "" },
                { forumName: "都市怪谈", forumValue: "15", forumGroupId: "" },
                { forumName: "支援1", forumValue: "17", forumGroupId: "" },
                { forumName: "基佬", forumValue: "18", forumGroupId: "" },
                { forumName: "姐妹2", forumValue: "19", forumGroupId: "" },
                { forumName: "日记", forumValue: "20", forumGroupId: "" },
                { forumName: "美食", forumValue: "21", forumGroupId: "" },
                { forumName: "喵版", forumValue: "22", forumGroupId: "" },
                { forumName: "社畜", forumValue: "23", forumGroupId: "" },
                { forumName: "车万养老院", forumValue: "24", forumGroupId: "" },
            ]
        }]
    },
}