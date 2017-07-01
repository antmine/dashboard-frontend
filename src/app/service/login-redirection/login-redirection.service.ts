import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Router} from "@angular/router";

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginRedirectionService {

    constructor(
        private http: Http,
        private router: Router
    )
    { }

    login(username: string, password: string) {
    }

    checkStatus(response: Response) {
        if (response.status === 401) {
            this.router.navigate(["/login"]);
        }
    }

    logout(): void {
    }
}