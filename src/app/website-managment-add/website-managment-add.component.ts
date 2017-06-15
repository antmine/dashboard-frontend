import { Component, OnInit } from '@angular/core';
import {RequestOptions,Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-website-managment-add',
    templateUrl: './website-managment-add.component.html',
    styleUrls: ['./website-managment-add.component.css']
})
export class WebsiteManagmentAddComponent implements OnInit {

    constructor(private http: Http) {}

    ngOnInit() {
    }

    newWebsite() {
        var data = {
            "NAME" : document.forms["website-form"]["web-name"].value,
            "URL": document.forms["website-form"]["web-url"].value,
            "CRYPTO_CURRENCYs" : [
                {
                    "ID_CRYPTO": document.forms["website-form"]["web-currency"].value,
                    "IS_ENABLE": document.forms["website-form"]["web-enable"].value,
                }
            ]
        };
        let url = "http://back.dashboard.antmine.io/website";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        this.http.post(url, data, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res || { };
    }

    private handleError (error: Response | any) {
        let errMsg;
        if (error instanceof Response) {
            const body = error.json() || '';
            console.log(body);
            errMsg = body;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }


}