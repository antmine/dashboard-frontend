import {NgModule}               from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { SignupComponent }   from './signup/signup.component';
import { ProfileComponent }       from './profile/profile.component';


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'site/:owner/:id', component: SiteDetailsComponent },
    { path: 'signup',  component: SignupComponent },
    { path: 'profile', component: ProfileComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}