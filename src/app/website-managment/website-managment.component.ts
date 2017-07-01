
import { Component, OnInit } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { LoginRedirectionService} from "app/service/login-redirection/login-redirection.service";
import { MaterialModule, MdDialog } from "@angular/material";
import { Router, Event as RouterEvent } from "@angular/router";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {textDef} from "@angular/core/src/view";
import { Site } from "../models/site";

@Component({
    selector: 'app-websiteManagment',
    templateUrl: './website-managment.component.html',
    styleUrls: ['./website-managment.component.css'],
    providers: [LoginRedirectionService]
})

export class WebsiteManagmentComponent implements OnInit {
	public data;
	public dataSpecificWebsite;
	private dialogRef;

	constructor(private http: Http,
				public dialog: MdDialog,
				private loginRedirectionService: LoginRedirectionService
	)
	{}

	ngOnInit() {
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
			(err) => {
				console.log('GET request error: ' + err);
				this.loginRedirectionService.checkStatus(err);
			},
			() => {}
		);
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
				this.dataSpecificWebsite = res;
				this.dialogRef = this.dialog.open(DisplayWebsiteDialog);
				this.getScript();
				this.dialogRef.componentInstance.site.id = res["ID_WEBSITE"];
				this.dialogRef.componentInstance.site.name = res["NAME"];
				this.dialogRef.componentInstance.site.url = res["URL"];
				this.dialogRef.componentInstance.site.enable = res["IS_ACTIVE"];
			},
			err => console.log("GET request error: " + err),
			() => {}
		);
	}

	deleteWebsite(row) {
		 let url = "http://back.dashboard.antmine.io/website/" + row.ID_WEBSITE;
     let options = new RequestOptions({withCredentials: true });
     this.http.delete(url, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
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

@Component({
	selector: "display-website-dialog",
	templateUrl: "display-website-dialog.html"
})
export class DisplayWebsiteDialog {
	site = new Site();
}
