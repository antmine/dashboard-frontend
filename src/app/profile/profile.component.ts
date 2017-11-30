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
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.css"],
	providers: [LoginRedirectionService]
})
export class ProfileComponent implements AfterViewInit {
	private confirmationDialog: MatDialogRef<ConfirmationDialog>;
	client = new Client();

	constructor(
		private http: Http,
		private router: Router,
		public snackBar: MatSnackBar,
		private loginRedirectionService: LoginRedirectionService,
		public dialog: MatDialog,
		private loaderService: LoaderService
	) {}

	ngAfterViewInit() {
		setTimeout(_=> this.displayProfil());
	}

	private displayProfil(){
		this.loaderService.displayLoader(true);
		let url = "http://back.dashboard.antmine.io/client";
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
					this.client = res;
					this.client.DATE_BIRTHDAY = new Date(this.client.DATE_BIRTHDAY);
					this.loaderService.displayLoader(false);
					console.log(this.client);
				},
				err => {
					console.log("GET request error: " + err);
					this.loginRedirectionService.checkStatus(err);
					this.loaderService.displayLoader(false);
				}
			);
	}

	public onSubmit() {
		this.loaderService.displayLoader(true);
		let url = "http://back.dashboard.antmine.io/client";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http
			.put(url, this.client, options)
			.map(res => res.text())
			.subscribe(
				data => {
					this.snackBar.open("Profil sauvegardé", "Ok");
					this.loaderService.displayLoader(false);
				},
				err => {
					this.snackBar.open("Il y a eu une erreur", "Ok")
					this.loaderService.displayLoader(false);
				}
			);
	}

	public deleteAccount() {
		this.confirmationDialog = this.dialog.open(ConfirmationDialog, {
			disableClose: false
		});
		this.confirmationDialog.componentInstance.confirmMessage = "Etes vous sûr de vouloir supprimer ce compte ?"

		this.confirmationDialog.afterClosed().subscribe(result => {
			if(result) {
				this.loaderService.displayLoader(true);
				let url = "http://back.dashboard.antmine.io/client";
				let headers = new Headers({ "Content-Type": "application/json" });
				let options = new RequestOptions({
					headers: headers,
					withCredentials: true
				});
				this.http.delete(url, options).subscribe(
					success => {
						this.loaderService.displayLoader(false);
						this.router.navigate(["login"]);
						this.snackBar.open("Vous avez été déconnecté", "Ok");
					},
					error => {
						console.log(error);
						this.loginRedirectionService.checkStatus(error);
						this.loaderService.displayLoader(false);
					}
				);
			}
			this.confirmationDialog = null;
		});
	}
}
