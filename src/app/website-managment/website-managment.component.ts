import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


@Component({
    selector: 'app-websiteManagment',
    templateUrl: './website-managment.component.html',
    styleUrls: ['./website-managment.component.css']
})
export class WebsiteManagmentComponent implements OnInit {

    public data;

    constructor(private http: Http) {
        this.http.get("https://back.dashboard.antmine.io/website")
            .map(response => response.json()).subscribe((res) =>{
                this.data = res;
            },
            (err) => console.log(err),
            () => {}
        );
    }

    ngOnInit() {
    }
}
