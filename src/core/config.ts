export let IslandsCode = {
    A: 'A',
    Beitai: 'Beitai'
};
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
}
export let IslandConfig: { [key: string]: IslandConfigModel } = {
    [IslandsCode.A]: {
        Host: "https://adnmb.com",
        PictureHost: "http://img6.nimingban.com/",
        GetThreadAPI: "{0}/Api/showf/id/{1}/page/{2}",
        GetReplyAPI: "{0}/Api/thread/id/{1}/page/{2}",
        GetRefAPI: "{0}/Api/ref?id:{1}",
        PostThreadAPI: "{0}/Home/Forum/doPostThread.html",
        PostReplyAPI: "{0}/Home/Forum/doReplyThread.html",
        PageSize: 19,
        IslandCode: IslandsCode.A,
    },
    [IslandsCode.Beitai]: {
        Host: "https://tnmb.org",
        PictureHost: "https://tnmbstatic.fastmirror.org/Public/Upload/",
        GetThreadAPI: "{0}/Api/showf/id/{1}/page/{2}",
        GetReplyAPI: "{0}/Api/thread/id/{1}/page/{2}",
        GetRefAPI: "{0}/Api/ref?id:{1}",
        PostThreadAPI: "{0}/home/forum/dopostthread.html",
        PostReplyAPI: "{0}/home/forum/doreplythread.html",
        PageSize: 19,
        IslandCode: IslandsCode.Beitai,
    },
}