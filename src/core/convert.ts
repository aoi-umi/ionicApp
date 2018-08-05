import { IslandsCode, IslandConfig } from '../core/config';
import * as MyModel from '../model/myModel';
import * as AModel from '../model/aModel';
export let threadConvert = function (islandCode: string, data): MyModel.ThreadModel {
    return replyConvert(islandCode, data) as any;
}

export let replyConvert = function (islandCode: string, data): MyModel.ReplyListModel {
    let returnData: MyModel.ReplyListModel;
    returnData = contentConvert(islandCode, data, false) as any;
    returnData.replys.forEach(ele => {
        contentConvert(islandCode, ele, true);
    });
    return returnData;
}

export let contentConvert = function (islandCode: string, data, reply: boolean): MyModel.ReplyModel {
    let returnData: MyModel.ReplyListModel;
    let islandConfig = IslandConfig[islandCode];
    if (typeof data != 'object')
        throw new Error('error data:' + data);
    switch (islandCode) {
        case IslandsCode.A:
        case IslandsCode.Beitai:
            let d = data as AModel.ReplyListModel;
            returnData = data;
            if (returnData.title == '无标题')
                returnData.title = '';
            if (returnData.name == '无名氏')
                returnData.name = '';
            if (!reply) {
                returnData.replyCount = parseInt(d.replyCount);
                returnData.totalPage = Math.ceil(returnData.replyCount / islandConfig.PageSize);
            }
            returnData.admin = d.admin != '0';
            returnData.sage = d.sage != '0';
            returnData.islandCode = islandCode;
            break;
    }
    fixConvert(islandCode, returnData);
    return returnData;
}

export let fixConvert = function (islandCode: string, data: MyModel.BaseContentModel) {
    let islandConfig = IslandConfig[islandCode];
    switch (islandCode) {
        case IslandsCode.A:
        case IslandsCode.Beitai:
            data.imagePath = islandConfig.PictureHost + 'image/';
            data.imageThumbPath = islandConfig.PictureHost + 'thumb/';
            break;
    }
}