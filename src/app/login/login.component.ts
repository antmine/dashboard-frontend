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
		this.loaderService.displayLoader(true);
		let url = "http://back.dashboard.antmine.io:80/client/login";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});

		this.http.post(url, this.login, options).
		map(response => response.json()).
		subscribe((res) => {
			console.log(res)
			this.loaderService.displayLoader(false);
			this.snackBar.dismiss()
			this.router.navigate(["dashboard"]);
		},
		(err) => {
			this.loaderService.displayLoader(false);
			if (err.json().code == 10)
				this.snackBar.open("Veuillez activer votre compte", "Ok");
			else
				this.snackBar.open("Identifiants incorrects", "Ok");
		},
		() => {
			//console.log(this.data)
		})
	}

	private extractData(res: Response) {
		console.log(res);
		this.snackBar.dismiss()
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
