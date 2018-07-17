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
    sage: string;
    admin: string;
}
export class ThreadModel extends BaseContentModel {
    remainReplys: number;
    replyCount: string;
    replys: ReplyModel[];
}

export class ReplyModel extends BaseContentModel {
}

export class ReplyListModel extends ThreadModel {
}