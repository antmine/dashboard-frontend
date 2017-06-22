import { Component, OnInit, Injectable } from '@angular/core';
import {CookieService} from "angular2-cookie/core";
import {RequestOptions,Headers, Http, Response} from '@angular/http';
import {Router}                                       from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CookieService]
})
export class DashboardComponent implements OnInit {

  constructor(
      private _cookieService: CookieService,
      private router: Router,
      private http: Http,
  ) {
    if (!this._cookieService.get("token"))
      this.router.navigate(["/login"]);
  }

  ngOnInit() {
  }
}
