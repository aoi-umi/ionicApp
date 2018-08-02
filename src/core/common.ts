import { ToastController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class CommonProvider {
    constructor(private toastCtrl: ToastController) {
    }

    stringFormat(formatString: string, ...args) {
        if (!formatString)
            formatString = '';
        let reg = /(\{(\d)\})/g;
        if (typeof args[0] === 'object') {
            args = args[0];
            reg = /(\{([^{}]+)\})/g;
        }
        let result = formatString.replace(reg, function () {
            let match = arguments[2];
            return args[match] || '';
        });
        return result;
    }

    showMsg(message: string) {
        this.toastCtrl
            .create({
                message: message,
                duration: 3000,
                position: 'top'
            })
            .present();
    }

    s4(count?: number) {
        let str = '';
        if (count == undefined)
            count = 1;
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                str += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
        }
        return str;
    }
    guid() {
        let s4 = this.s4;
        return `${s4(2)}-${s4()}-${s4()}-${s4()}-${s4(3)}`;
    }
}