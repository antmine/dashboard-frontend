import { Component, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { LoginRedirectionService } from "app/service/login-redirection/login-redirection.service";
import { LoaderService } from "../service/loader.service";
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { ConfirmationDialog} from '../confirmationDialog/confirmationDialog';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Client } from "../models/client";

@Component({
	selector: "app-profile",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.css"],
	providers: [LoginRedirectionService]
})
export class ResetPasswordComponent implements AfterViewInit {
  hash_password = "";

	constructor(
		private http: Http,
		private router: Router,
		private loginRedirectionService: LoginRedirectionService,
		public snackBar: MatSnackBar,
    private loaderService: LoaderService
	) {}

	ngAfterViewInit() {
	}

  public onSubmit() {
    this.loaderService.displayLoader(true);
    let url = "http://back.dashboard.antmine.io/client/reset";
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true,
    });

    this.http
    .post(url, {"email_address" : this.hash_password}, options)
    .map(res => res.text())
    .subscribe(
      data => {
        this.loaderService.displayLoader(false);
        this.snackBar.open("Votre mot de passe a été réinitialisé", "Ok");
      },
      err => {
        console.log(err);
        this.loaderService.displayLoader(false);
        this.loginRedirectionService.checkStatus(err)
      }
    );
  }
}
