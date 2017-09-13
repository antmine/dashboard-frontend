import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {
	RequestOptions,
	Request,
	Headers,
	Http,
	Response
} from "@angular/http";
import { MdSnackBar } from "@angular/material";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Client } from "../models/client";

@Component({
	selector: "app-signup",
	templateUrl: "./signup.component.html",
	styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
	client = new Client();

	constructor(
		private http: Http,
		private router: Router,
		public snackBar: MdSnackBar
	) {}

	ngOnInit() {}

	onSubmit() {
		this.create(this.client).subscribe(
			success => this.router.navigate(["login"]),
			error =>
				this.snackBar.open(
					"Un compte existe déjà avec cette adresse mail",
					"Ok"
				)
		);
	}

	create(data): Observable<Client> {
		let url = "http://back.dashboard.antmine.io:80/client/signup";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({ headers: headers });
		return this.http
			.post(url, data, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		console.log("Signup OK");
		return res;
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
