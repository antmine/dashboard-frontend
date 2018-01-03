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
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.css"],
	providers: [LoginRedirectionService]
})
export class ForgotPasswordComponent implements AfterViewInit {
  email_address = "";

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
    .post(url, {"EMAIL_ADDRESS" : this.email_address}, options)
    .map(res => res.text())
    .subscribe(
      data => {
        this.loaderService.displayLoader(false);
        this.snackBar.open("Un email a été envoyé", "Ok");
      },
      err => {
        console.log(err);
        this.loaderService.displayLoader(false);
        this.loginRedirectionService.checkStatus(err)
      }
    );


  }
}
