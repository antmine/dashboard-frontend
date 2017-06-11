import { Component, OnInit } from '@angular/core';
import {RequestOptions, Request, RequestMethod, Headers, Http, Response, RequestOptionsArgs} from '@angular/http';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { Client } from '../models/client';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    model = new Client();

    constructor(private http: Http, private router: Router) {
        this.http.get("http://back.dashboard.antmine.io/client")
            .map(response => response.json()).subscribe((res) =>{
                console.log(res);
                this.model = res;
                alert(this.model.name);
            },
            (err) => console.log('request error: ' + err),
            () => {}
        );
    }

    ngOnInit() {}

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
        this.http.put("http://back.dashboard.antmine.io/client", data)
            .map(response => response.json()).subscribe((res) =>{
                console.log(res);
                alert("edited")
            },
            (err) => console.log('request error: ' + err),
            () => {}
        );
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
}

