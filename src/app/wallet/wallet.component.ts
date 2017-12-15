import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
})
export class WalletComponent implements OnInit {
	client = new Client();

	constructor(
		private http: Http,
		private router: Router,
		public snackBar: MatSnackBar,
		private loaderService: LoaderService
	) {}

	ngOnInit() {}

	ngAfterViewInit() {
		setTimeout(_=> this.displayBitcoin());
	}

	private displayBitcoin(){
		//this.loaderService.displayLoader(true);
		/*let url = "http://back.dashboard.antmine.io/client";
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
			},
				err => {
				console.log("GET request error: " + err);
				this.loginRedirectionService.checkStatus(err);
				this.loaderService.displayLoader(false);
			}
			);*/
	}

	onSubmit() {
		this.loaderService.displayLoader(true);
		/*let url = "http://back.dashboard.antmine.io/client";
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = new RequestOptions({
			headers: headers,
			withCredentials: true
		});
		this.http
			.post(url, this.client, options)
			.map(res => res.text())
			.subscribe(
				data => {
					this.loaderService.displayLoader(false);
					this.snackBar.open("Votre transfert à été réalisé", "Ok");
				},
				err => {
					console.log("POST request error: " + err);
					this.loginRedirectionService.checkStatus(err);
					this.loaderService.displayLoader(false);
				}
			);*/
	}


}
