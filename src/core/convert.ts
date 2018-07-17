import { IslandsCode, IslandConfig } from '../core/config';
import * as MyModel from '../model/myModel';
import * as AModel from '../model/aModel';
export let replyListConvert = function (islandCode: string, data): MyModel.ReplyListModel {
    let returnData: MyModel.ReplyListModel;
    let islandConfig = IslandConfig[islandCode];
    switch (islandCode) {
        case IslandsCode.A:
        case IslandsCode.Beitai:
            let d = data as AModel.ReplyListModel;
            returnData = data;
            if (returnData.title == '无标题')
                returnData.title = '';
            if (returnData.name == '无名氏')
                returnData.name = '';
            returnData.replyCount = parseInt(d.replyCount);
            returnData.totalPage = Math.ceil(returnData.replyCount / islandConfig.PageSize);
            returnData.admin = d.admin != '0';
            returnData.sage = d.sage != '0';
            returnData.replys.forEach(ele => {
                if (ele.title == '无标题')
                    ele.title = '';
                if (ele.name == '无名氏')
                    ele.name = '';
                ele.admin = ele.admin as any != '0';
                ele.sage = ele.sage as any != '0';
            });
            break;
    }
    return returnData;
}