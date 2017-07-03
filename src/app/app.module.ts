import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { FormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { MaterialModule }         from '@angular/material';
import {BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { ChartsModule }           from 'ng2-charts';
import 'hammerjs';

import { AppRoutingModule }       from './app-routing.module'

<<<<<<< Updated upstream
import { AppComponent }           from './app.component';
import { DashboardComponent }          from './dashboard/dashboard.component';
import { DashboardBrowsersComponent } from './dashboard-browsers/dashboard-browsers.component';
import { DashboardIncomeComponent } from './dashboard-income/dashboard-income.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardBrowsersComponent,
    DashboardIncomeComponent,
    SiteDetailsComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    ChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
=======
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardBrowsersComponent } from "./dashboard-browsers/dashboard-browsers.component";
import { DashboardIncomeComponent } from "./dashboard-income/dashboard-income.component";
import { SiteDetailsComponent } from "./site-details/site-details.component";
import { ProfileComponent } from "./profile/profile.component";
import { SignupComponent } from "./signup/signup.component";
import { WebsiteManagmentComponent } from "./website-managment/website-managment.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { WebsiteManagmentAddComponent } from "./website-managment-add/website-managment-add.component";
import { WebsiteManagmentEditComponent } from "./website-managment-edit/website-managment-edit.component";

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
		WebsiteManagmentEditComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		ChartsModule
	],
	providers: [],
	entryComponents: [WebsiteManagmentEditComponent],
	bootstrap: [AppComponent]
>>>>>>> Stashed changes
})
export class AppModule { }
