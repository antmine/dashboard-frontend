import { Component, OnInit } from '@angular/core';
import {RequestOptions,Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    clientInfo;

    constructor(private http: Http) {

    }

    ngOnInit() {
        let url = "http://back.dashboard.antmine.io/client";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        this.http.get(url, options)
            .map(response => response.json()).subscribe((res) =>{
                this.clientInfo = res;
            },
            (err) => console.log('GET request error: ' + err),
            () => {}
        );
    }

    onEditInfo() {
        var data = {
            "NAME" : document.forms["edit-form"]["name"].value,
            "LASTNAME" : document.forms["edit-form"]["lastname"].value,
            "EMAIL_ADDRESS" : document.forms["edit-form"]["email"].value,
            "DATE_BIRTHDAY" : document.forms["edit-form"]["birthday"].value,
            "HASH_PASSWORD" : document.forms["edit-form"]["pwd"].value,
            "ADDRESS" : {
                "STREET" : document.forms["edit-form"]["street"].value,
                "CITY" : document.forms["edit-form"]["city"].value,
                "ZIP_CODE" : document.forms["edit-form"]["zip-code"].value,
                "COUNTRY" : document.forms["edit-form"]["country"].value,
            }
        }
        this.triggerEdit();
        let url = "http://back.dashboard.antmine.io/client";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        this.http.put(url, data, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    triggerEdit() {
        var x = document.getElementById("info-container");
        var y = document.getElementById("info-form");
        var z = document.getElementById("edit-button");

        x.classList.toggle("hidden");
        y.classList.toggle("hidden");
        if (z.textContent == "unedit") {
            z.textContent = "edit";
        }
        else {
            z.textContent = "unedit";
        }
    }

    private extractData(res: Response) {
        window.location.reload();
        return res|| { };
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

