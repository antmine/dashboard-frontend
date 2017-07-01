import { Component, OnInit } from "@angular/core";
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { LoginRedirectionService } from "app/service/login-redirection/login-redirection.service";
import { MdSnackBar } from "@angular/material";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Client } from "../models/client";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.css"],
	providers: [LoginRedirectionService]
})
export class ProfileComponent implements OnInit {
	client = new Client();

	constructor(
		private http: Http,
		public snackBar: MdSnackBar,
		private loginRedirectionService: LoginRedirectionService
	) {}

	ngOnInit() {
		let url = "http://back.dashboard.antmine.io/client";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http.get(url, options).map(response => response.json()).subscribe(
			res => {
				this.client = res;
				this.client.DATE_BIRTHDAY = new Date(this.client.DATE_BIRTHDAY);
				console.log(this.client);
			},
			err => {
				console.log("GET request error: " + err);
				this.loginRedirectionService.checkStatus(err);
				},
			() => {}
		);
	}

	public onSubmit() {
		let url = "http://back.dashboard.antmine.io/client";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http
			.put(url, this.client, options)
			.map(res => res.text())
			.subscribe(
				data => this.snackBar.open("Profil edited", "Ok"),
				err => this.loginRedirectionService.checkStatus(err)
			);
	}
}
