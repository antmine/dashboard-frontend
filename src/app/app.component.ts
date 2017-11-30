import { Component, OnInit } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { MatMenuModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { LoaderService } from "./service/loader.service";
import {
	Router,
	Event as RouterEvent,
	NavigationStart,
	NavigationEnd,
	NavigationCancel,
	NavigationError
} from "@angular/router";

@NgModule({
	imports: [MatMenuModule],
	exports: [MatMenuModule]
})
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	providers: [LoaderService]
})
export class AppComponent {
	public data;
	objLoaderStatus: boolean;

	constructor(
		private http: Http,
		private router: Router,
		private loaderService: LoaderService
	) {
		this.objLoaderStatus = false;
		// router.events.subscribe((event: RouterEvent) => {
		// 	this.navigationInterceptor(event);
		// });
	}

	ngOnInit() {
		this.loaderService.loaderStatus.subscribe((val: boolean) => {
			this.objLoaderStatus = val;
		});
	}

	// navigationInterceptor(event: RouterEvent): void {
	// 	if (event instanceof NavigationStart) {
	// 		this.loading = true;
	// 	}
	// 	if (event instanceof NavigationEnd) {
	// 		this.loading = false;
	// 	}
	// 	// Set loading state to false in both of the below events to hide the spinner in case a request fails
	// 	if (event instanceof NavigationCancel) {
	// 		this.loading = false;
	// 	}
	// 	if (event instanceof NavigationError) {
	// 		this.loading = false;
	// 	}
	// }
}
