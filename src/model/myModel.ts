
class BaseContentModel {
    id: string;
    img: string;
    ext: string;
    now: string;
    userid: string;
    name: string;
    email: string;
    title: string;
    content: string;
    sage: boolean;
    admin: boolean;
}
export class ThreadModel extends BaseContentModel {
    _id: string;
    islandCode: string;
    remainReplys: number;
    replyCount: number;
    replys: ReplyModel[];
    totalPage: number;
}

export class ReplyModel extends BaseContentModel {
}

export class ReplyListModel extends ThreadModel {
}