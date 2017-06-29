import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Site } from "../models/site";

@Component({
	selector: "app-website-managment-add",
	templateUrl: "./website-managment-add.component.html",
	styleUrls: ["./website-managment-add.component.css"]
})
export class WebsiteManagmentAddComponent implements OnInit {
	site = new Site();

	currencies = [
		{
			id: 1,
			name: "BitCoin"
		}
	];

	constructor(private http: Http, private router: Router) {}

	ngOnInit() {}

	onSubmit() {
		var data = {
			NAME: this.site.name,
			URL: this.site.url,
			CRYPTO_CURRENCYs: [
				{
					ID_CRYPTO: this.site.currency,
					IS_ENABLE: this.site.enable
				}
			]
		};

		this.create(data).subscribe(
			success => this.router.navigate(["website"]),
			error => console.log(error)
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
