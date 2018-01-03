import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginRedirectionService } from "app/service/login-redirection/login-redirection.service";


import {
	RequestOptions,
	Request,
	Headers,
	Http,
	Response
} from "@angular/http";
import { MatSnackBar, MatProgressSpinnerModule } from "@angular/material";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Client } from "../models/client";
import { LoaderService } from "../service/loader.service";

@Component({
	selector: "app-wallet",
	templateUrl: "./wallet.component.html",
	styleUrls: ["./wallet.component.css"],
	providers: [LoginRedirectionService]
})
export class WalletComponent implements OnInit {
	client = new Client();
	public data;
	public bitcoinAmount = 0;

	constructor(
		private http: Http,
		private router: Router,
		public snackBar: MatSnackBar,
		private loaderService: LoaderService,
		private loginRedirectionService: LoginRedirectionService,
	) {}

	ngOnInit() {}

	ngAfterViewInit() {
		setTimeout(_=> this.displayBitcoin());
	}

	private displayBitcoin(){
		this.loaderService.displayLoader(true);
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
				this.getAmountBitcoin(this.data);
			},
			err => {
				console.log("GET request error: " + err);
				this.loginRedirectionService.checkStatus(err);
			},
			() => {}
		);
	}

	private getAmountBitcoin(data) {
		for (var i = 0; i < data.length; ++i) {
			let url = "http://back.dashboard.antmine.io/website/" + this.data[i].ID_WEBSITE;
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
					this.bitcoinAmount += res.BITCOIN_AMOUNT;
				},
				err => {
					this.loaderService.displayLoader(false);
					this.loginRedirectionService.checkStatus(err);
				}
			);
		}
	}

	onSubmit() {
		this.loaderService.displayLoader(true);
		let url = "http://back.dashboard.antmine.io/wallet/transfert";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http
			.post(url, this.client, options)
			.map(res => res.json())
			.subscribe(
				data => {
					this.loaderService.displayLoader(false);
					this.snackBar.open("Le transfert a été réalisé", "Ok");
				},
				err => {
					var error = err._body.split('\"');
					console.log(error);
					this.snackBar.open("Erreur de transfert: "+error[5], "Ok");
					this.loginRedirectionService.checkStatus(err);
					this.loaderService.displayLoader(false);
				}
			);
	}


}
