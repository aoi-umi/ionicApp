import { Injectable } from "@angular/core";
import { CommonProvider } from "./common";
import { ThreadModel } from "../model/myModel";

@Injectable()
export class DatabaseProvider {
    private markListKey = 'markList';
    private db: Database;
    markModel: Model<ThreadModel>;
    constructor(private common: CommonProvider) {
        this.db = new Database();
        this.markModel = new Model<ThreadModel>(this.markListKey, this.db, common);        
    }

    getData(key: string) {
        return this.db.getData.apply(this.db, arguments);
    }

    setData(key: string, data?: any) {
        return this.db.setData.apply(this.db, arguments);
    }
}

class Database {
    constructor() {
    }

    getData(key: string) {
        let data = localStorage.getItem(key);
        return JSON.parse(data);
    }

    setData(key: string, data?: any) {
        if (!data)
            localStorage.removeItem(key);
        else {
            data = JSON.stringify(data);
            localStorage.setItem(key, data);
        }
    }
}

class Model<T extends { _id: string }> {
    constructor(private key: string, private db: Database, private common: CommonProvider) {

    }

    getData(queryFn?: (value: T, index: number, array: T[])=>any) {
        let list: T[] = this.db.getData(this.key) || [];
        if (queryFn)
            list = list.filter(queryFn as any);
        return list;
    }

    setData(data) {
        if (!data)
            return false;
        let list = this.getData();
        let index = -1;
        if (!data._id)
            data._id = this.common.guid();
        else
            index = list.findIndex((ele) => ele._id == data._id);
        if (index >= 0)
            list[index] = data;
        else
            list.push(data);
        this.db.setData(this.key, list);
        return true;
    }

    removeData(_id: string | string[]) {
        let list = this.getData();
        let idList: string[] = typeof _id === 'string' ? [_id] : _id;
        idList.forEach(id => {
            let index = list.findIndex((ele) => ele._id == id);
            if (index >= 0)
                list.splice(index, 1);
        });
        this.db.setData(this.key, list);
    }
}