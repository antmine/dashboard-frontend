import { NgModule }               from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { SignupComponent }   from './signup/signup.component';
import { ProfileComponent }       from './profile/profile.component';
import { WebsiteManagmentComponent } from './website-managment/website-managment.component';
import { LoginComponent }   from './login/login.component';
import { WebsiteManagmentAddComponent } from "./website-managment-add/website-managment-add.component";
import { LogoutComponent }   from './logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'site/:owner/:id', component: SiteDetailsComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'logout',  component: LogoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'website', component: WebsiteManagmentComponent},
  { path: 'website/add', component: WebsiteManagmentAddComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
