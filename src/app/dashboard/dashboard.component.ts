import { Component, OnInit, Injectable, ViewChild } from "@angular/core";
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Router } from "@angular/router";
import { StatsWraper } from '../models/statsWraper';

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
	public sites
	public siteAvailable = false
	constructor(private router: Router, private http: Http) {}

	ngOnInit() {
		this.getSites()
	}

	private getSites(){
		let url = "http://back.dashboard.antmine.io/website";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http
		.get(url, options)
		.map(res => res.text())
		.subscribe(
			data => {
				this.sites = JSON.parse(data);
				console.log(this.sites)
				this.siteAvailable = true
			},
			err => {}
		);
	}
}
