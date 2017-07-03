import { Component, OnInit } from "@angular/core";
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { LoginRedirectionService } from "app/service/login-redirection/login-redirection.service";
import { WebsiteManagmentEditComponent } from "../website-managment-edit/website-managment-edit.component";
import { MdSnackBar, MdDialogRef } from "@angular/material";
import { MaterialModule, MdDialog } from "@angular/material";
import { Router, Event as RouterEvent } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import { textDef } from "@angular/core/src/view";
import { Site } from "../models/site";

@Component({
	selector: "app-websiteManagment",
	templateUrl: "./website-managment.component.html",
	styleUrls: ["./website-managment.component.css"],
	providers: [LoginRedirectionService]
})
export class WebsiteManagmentComponent implements OnInit {
	public data;
	private dialogRef;

	constructor(
		private http: Http,
		public dialog: MdDialog,
		public snackBar: MdSnackBar,
		private loginRedirectionService: LoginRedirectionService
	) {}

	ngOnInit() {
		this.getWebsites();
	}

	displayWebsite(row) {
		let url = "http://back.dashboard.antmine.io/website/" + row.ID_WEBSITE;
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http.get(url, options).map(response => response.json()).subscribe(
			res => {
				this.dialogRef = this.dialog.open(WebsiteManagmentEditComponent);
				this.dialogRef.afterClosed().subscribe(res => {
					if (res) this.getWebsites();
				});
				this.getScript();
				this.dialogRef.componentInstance.site = res;
			},
			err => console.log("GET request error: " + err),
			() => {}
		);
	}

	deleteWebsite(row) {
		let url = "http://back.dashboard.antmine.io/website/" + row.ID_WEBSITE;
		let options = new RequestOptions({ withCredentials: true });

		this.http.delete(url, options).map(res => res.text()).subscribe(
			data => {
				this.snackBar.open("Site deleted", "Ok");
				this.getWebsites();
			},
			err => this.loginRedirectionService.checkStatus(err)
		);
	}

	getWebsites() {
		let url = "http://back.dashboard.antmine.io/website";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http.get(url, options).map(response => response.json()).subscribe(
			res => {
				this.data = res;
				console.log(this.data);
			},
			err => {
				console.log("GET request error: " + err);
				this.loginRedirectionService.checkStatus(err);
			},
			() => {}
		);
	}

	getScript() {
		let url = "http://back.dashboard.antmine.io/code";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http.get(url, options).map((res: Response) => res).subscribe(data => {
			this.dialogRef.componentInstance.site.script = data["_body"];
		});
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
