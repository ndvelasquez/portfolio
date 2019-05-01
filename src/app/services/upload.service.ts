import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService {
    public url: string;

    constructor() {
        this.url = Global.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
        return new Promise((resolved, rejected) => {
            const formData = new FormData();
            const xhr = new XMLHttpRequest();

// tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }
// tslint:disable-next-line: only-arrow-functions
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolved(JSON.parse(xhr.response));
                    } else {
                    rejected(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }

}
