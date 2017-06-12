import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { FormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { MaterialModule }         from '@angular/material';
import {BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { ChartsModule }           from 'ng2-charts';
import 'hammerjs';

import { AppRoutingModule }       from './app-routing.module'

import { AppComponent }           from './app.component';
import { DashboardComponent }          from './dashboard/dashboard.component';
import { DashboardBrowsersComponent } from './dashboard-browsers/dashboard-browsers.component';
import { DashboardIncomeComponent } from './dashboard-income/dashboard-income.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { WebsiteManagmentComponent } from './website-managment/website-managment.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

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
    WebsiteManagmentComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
