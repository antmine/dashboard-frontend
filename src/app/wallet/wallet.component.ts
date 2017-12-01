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
	selector: "app-signup",
	templateUrl: "./wallet.component.html",
	styleUrls: ["./wallet.component.css"]
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

	onSubmit() {
		this.loaderService.displayLoader(true);
	}


}
