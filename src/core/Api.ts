import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
@Injectable()
export class ApiProvider {
    readonly host: string;
    constructor(private http: Http) {
        this.host = 'http://localhost:5501';
    }

    private send(url: string, method: string = 'post', data?: any) {
        return this.http.request(this.host + url, { method: method, body: data }).toPromise().then((t: Response) => {
            let result = t.json();
            return result;
        });
    }

    private get(url: string, data?: any) {
        return this.send(url, 'get', data);
    }

    private post(url: string, data?: any) {
        return this.send(url, 'post', data);
    }

    test() {
        return this.get('/api/fleet/captcha');
    }
}   