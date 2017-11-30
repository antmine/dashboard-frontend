import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import {
	RequestOptions,
	Request,
	RequestMethod,
	Headers,
	Http,
	Response
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { LoaderService } from "../service/loader.service";

import { Login } from "../models/login";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
	login = new Login();

	constructor(
		private http: Http,
		private router: Router,
		public snackBar: MatSnackBar,
		private loaderService: LoaderService
	) {}

	ngOnInit() {}

	onSubmit() {
		this.create(this.login).subscribe(
			success => {
				this.loaderService.displayLoader(false);
				this.router.navigate(["dashboard"]);
			},
			error => {
				this.snackBar.open("Identifiants incorrects", "Ok");
				this.loaderService.displayLoader(false);
			}
		);
	}

	create(data): Observable<Login> {
		console.log(this.login);
		this.loaderService.displayLoader(true);
		let url = "http://back.dashboard.antmine.io:80/client/login";
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
		console.log(res);
		return res.json().data || {};
	}

	private handleError(error: Response | any) {
		let errMsg;
		this.loaderService.displayLoader(false);
		if (error instanceof Response) {
			const body = error.json() || "";
			this.snackBar.open("Identifiants incorrects", "Ok");
			console.log(body);
			errMsg = body;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	}
}
