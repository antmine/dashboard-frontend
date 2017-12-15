import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChartsModule } from "ng2-charts";
import "hammerjs";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardBrowsersComponent } from "./dashboard-browsers/dashboard-browsers.component";
import { DashboardIncomeComponent } from "./dashboard-income/dashboard-income.component";
import { SiteStatsComponent } from "./site-stats/site-stats.component";
import { SiteDetailsComponent } from "./site-details/site-details.component";
import { ProfileComponent } from "./profile/profile.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { ConfirmationDialog } from "./confirmationDialog/confirmationDialog";
import { WebsiteManagmentComponent } from "./website-managment/website-managment.component";
import { WebsiteManagmentAddComponent } from "./website-managment-add/website-managment-add.component";
import { WebsiteManagmentEditComponent } from "./website-managment-edit/website-managment-edit.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { MaterialModule } from "./material/material.module";

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		DashboardBrowsersComponent,
		DashboardIncomeComponent,
		SiteDetailsComponent,
		ProfileComponent,
		SignupComponent,
		LoginComponent,
		LogoutComponent,
		WebsiteManagmentComponent,
		WebsiteManagmentAddComponent,
		WebsiteManagmentEditComponent,
		ConfirmationDialog,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		SiteStatsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ChartsModule,
		MaterialModule
	],
	providers: [],
	entryComponents: [WebsiteManagmentEditComponent, ConfirmationDialog],
	bootstrap: [AppComponent]
})
export class AppModule {}
