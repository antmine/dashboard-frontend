import { Component } from "@angular/core";
import { RequestOptions, Headers, Http, Response } from "@angular/http";
//import { LoginRedirectionService } from "../service/login-redirection/login-redirection.service";
import { MdSnackBar, MdDialogRef } from "@angular/material";
import { MaterialModule, MdDialog } from "@angular/material";

import { Site } from "../models/site";

@Component({
	selector: "website-managment-editComponent",
	templateUrl: "website-managment-edit.component.html"
	//providers: [LoginRedirectionService]
})
export class WebsiteManagmentEditComponent {
	site = new Site();

	constructor(
		private http: Http,
		public snackBar: MdSnackBar,
		//private loginRedirectionService: LoginRedirectionService,
		public dialogRef: MdDialogRef<WebsiteManagmentEditComponent>
	) {}

	onSubmit() {
		console.log(this.site);
		let url =
			"http://back.dashboard.antmine.io/website/" + this.site.ID_WEBSITE;
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http.put(url, this.site, options).map(res => res.text()).subscribe(
			data => {
				this.snackBar.open("Site enregistré", "Ok");
				this.dialogRef.close(true);
			},
			err => this.snackBar.open("Impossible d'enregistrer le site", "Ok") //this.loginRedirectionService.checkStatus(err)
		);
	}
}
