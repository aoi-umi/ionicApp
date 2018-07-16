import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { islandConfig } from './config';

import * as common from './common';
@Injectable()
export class ApiProvider {
    constructor(private http: Http) {
    }
    private send(url: string, method: string = 'post', data?: any) {
        return this.http.request(url, { method: method, body: data }).toPromise().then((t: Response) => {
            let result = t.json();
            return result;
        }).catch((e) => {
            let msg = e.statusText || e.message || 'request error';
            throw new Error(msg);
        });
    }

    private get(url: string, data?: any) {
        return this.send(url, 'get', data);
    }

    private post(url: string, data?: any) {
        return this.send(url, 'post', data);
    }

    threadListGet(islandCode: string, id, page) {
        let config = islandConfig[islandCode];
        return this.get(common.stringFormat(config.GetThreadAPI, config.Host, id, page));
    }

    replyListGet(islandCode: string, id, page) {
        let config = islandConfig[islandCode];
        return this.get(common.stringFormat(config.GetReplyAPI, config.Host, id, page));
    }
}