import { Component, OnInit, Injector } from '@angular/core';
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
    loading: boolean = true;
    /*basicOptions:RequestOptionsArgs = {
        url: 'https://back.dashboard.antmine.io/client',
        method: RequestMethod.Get,
        search: null,
        headers: new Headers({'Cookies': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9DTElFTlQiOjQsImlhdCI6MTQ5NzAxOTQ0MywiZXhwIjo4Nzg5NzAxOTQ0M30.Q-YGRmzeo3yRbfOAR49ZEiPAO7uit5g2W8YGrhN7duk'}),
        body: null
    };*/


    constructor(private http: Http, private router: Router) {
     /* this.router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });

        this.http.get("back.dashboard.antmine.io/client")
            .map(response => response.json()).subscribe((res) =>{
                console.log(res);
                this.model = res;
                alert(this.model.name);
            },
            (err) => console.log('request error: ' + err),
            () => {}
        );*/

    }

    ngOnInit() {

    }

    onEditInfo() {
        alert("edited");
        var data = {
            "NAME" : this.model.name,
            "LASTNAME" : this.model.lastname,
            "EMAIL_ADDRESS" : this.model.email,
            //"DATE_BIRTHDAY" : this.model.birthday,
            "HASH_PASSWORD" : this.model.password,
            /*"ADDRESS" : {
             "STREET" : this.model.street,
             "CITY" : this.model.city,
             "ZIP_CODE" : this.model.zip_code,
             "COUNTRY" : this.model.country
             }*/
        }
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


    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }

}

