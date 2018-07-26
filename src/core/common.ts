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
}