import { Component, AfterViewInit } from "@angular/core";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { LoginRedirectionService } from "app/service/login-redirection/login-redirection.service";
import { LoaderService } from "../service/loader.service";
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: "app-profile",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.css"],
	providers: [LoginRedirectionService, FormBuilder]
})
export class ResetPasswordComponent implements AfterViewInit {
	hash_password = "";
	hash_confirmation = "";
	token = "";

	constructor(
		private http: Http,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private loginRedirectionService: LoginRedirectionService,
		public snackBar: MatSnackBar,
		private loaderService: LoaderService,
	) {}

	ngAfterViewInit() {
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			this.token = params['uuid'];
			console.log(this.token);
		});
	}

	public onSubmit() {
		if (this.hash_password != this.hash_confirmation) {
			this.snackBar.open("Les deux mots de passe ne sont pas identique");
			return;
		}

		if (!this.token) {
			this.snackBar.open("Aucun token n'est disponible");
			return;
		}

		this.loaderService.displayLoader(true);
		let url = "http://back.dashboard.antmine.io/validation/reset/" + this.token;
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true,
		});

		this.http
		.post(url, {"HASH_PASSWORD" : this.hash_password}, options)
		.map(res => res.text())
		.subscribe(
			data => {
				this.loaderService.displayLoader(false);
				this.snackBar.open("Votre mot de passe a été réinitialisé", "Ok");
			},
			err => {
				console.log(err);
				this.snackBar.open("Vous ne pouvez plus récupérer votre mot de passe", "Ok");
				this.loaderService.displayLoader(false)
				this.loginRedirectionService.checkStatus(err)
			}
		);
	}

	public fortgotPasswordRoute(){

	}

	public signupRoute(){

	}
}
