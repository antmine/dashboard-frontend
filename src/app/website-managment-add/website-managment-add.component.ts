import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { LoginRedirectionService } from "app/service/login-redirection/login-redirection.service";
import { LoaderService } from "../service/loader.service";

import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Site } from "../models/site";

@Component({
	selector: "app-website-managment-add",
	templateUrl: "./website-managment-add.component.html",
	styleUrls: ["./website-managment-add.component.css"],
	providers: [LoginRedirectionService]
})
export class WebsiteManagmentAddComponent implements OnInit {
	site = new Site();

	currencies = [
		{
			id: "BTC",
			name: "BitCoin"
		}
	];

	constructor(
		private http: Http,
		private router: Router,
		public snackBar: MatSnackBar,
		private loginRedirectionService: LoginRedirectionService,
		private loaderService: LoaderService
	) {}

	ngOnInit() {}

	onSubmit() {
		console.log(this.site);

		this.loaderService.displayLoader(true);
		this.create(this.site).subscribe(
			success => {
				this.loaderService.displayLoader(false);
				this.router.navigate(["website"])
			},
			error => {
				this.loaderService.displayLoader(false);
				console.log(error);
				this.snackBar.open("Erreur lors de la création", "Ok");
				this.loginRedirectionService.checkStatus(error);
			}
		);
	}

	create(data): Observable<Site> {
		let url = "http://back.dashboard.antmine.io/website";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		return this.http
			.post(url, data, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		return res || {};
	}

	private handleError(error: Response | any) {
		//this.loginRedirectionService.checkStatus(error);
		let errMsg;
		if (error instanceof Response) {
			const body = error.json() || "";
			console.log(body);
			errMsg = body;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	}
}
