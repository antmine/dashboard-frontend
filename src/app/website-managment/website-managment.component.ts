import { Component, AfterViewInit } from "@angular/core";
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { LoginRedirectionService } from "app/service/login-redirection/login-redirection.service";
import { WebsiteManagmentEditComponent } from "../website-managment-edit/website-managment-edit.component";
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LoaderService } from "../service/loader.service";
import { Router, Event as RouterEvent } from "@angular/router";
import { ConfirmationDialog } from "../confirmationDialog/confirmationDialog";
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
export class WebsiteManagmentComponent implements AfterViewInit {
	public data;
	private dialogRef;
	private confirmationDialog: MatDialogRef<ConfirmationDialog>;

	constructor(
		private http: Http,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private loginRedirectionService: LoginRedirectionService,
		private loaderService: LoaderService
	) {}

	ngAfterViewInit() {
		setTimeout(_=> this.getWebsites());
	}

	displayWebsite(row) {
		this.loaderService.displayLoader(true);
		let url = "http://back.dashboard.antmine.io/website/" + row.ID_WEBSITE;
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http
		.get(url, options)
		.map(response => response.json())
		.subscribe(
			res => {
				this.loaderService.displayLoader(false);
				this.dialogRef = this.dialog.open(WebsiteManagmentEditComponent);
				this.dialogRef.afterClosed().subscribe(res => {
					if (res) this.getWebsites();
				});
				this.getScript();
				this.dialogRef.componentInstance.site = res;
			},
			err => {
				this.loaderService.displayLoader(false);
				this.loginRedirectionService.checkStatus(err)
			}
		);
	}

	deleteWebsite(row) {

		this.confirmationDialog = this.dialog.open(ConfirmationDialog, {
			disableClose: false
		});
		this.confirmationDialog.componentInstance.confirmMessage = "Etes vous sûr de vouloir supprimer ce site ?"

		this.confirmationDialog.afterClosed().subscribe(result => {
			if(result) {
				this.loaderService.displayLoader(true);
				let url = "http://back.dashboard.antmine.io/website/" + row.ID_WEBSITE;
				let options = new RequestOptions({ withCredentials: true });

				this.http
				.delete(url, options)
				.map(res => res.text())
				.subscribe(
					data => {
						this.loaderService.displayLoader(false);
						this.snackBar.open("Site supprimé", "Ok");
						this.getWebsites();
					},
					err => {
						this.loaderService.displayLoader(false);
						this.loginRedirectionService.checkStatus(err)
					}
				);
			}
			this.confirmationDialog = null;
		});
	}

	getWebsites() {
		let url = "http://back.dashboard.antmine.io/website";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http
		.get(url, options)
		.map(response => response.json())
		.subscribe(
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
		//this.loaderService.displayLoader(true);
		let url = "http://back.dashboard.antmine.io/code";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http
		.get(url, options)
		.map((res: Response) => res)
		.subscribe(data => {
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
