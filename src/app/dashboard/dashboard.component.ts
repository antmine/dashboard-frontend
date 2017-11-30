import { Component, OnInit, Injectable } from "@angular/core";
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { Router } from "@angular/router";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
	constructor(private router: Router, private http: Http) {}

	ngOnInit() {}
}
