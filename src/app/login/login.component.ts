import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RequestOptions, Request, RequestMethod, Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Login }    from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = null;
  login = new Login();

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("submit");
    this.error = null;
    var data = {
      "EMAIL_ADDRESS" : this.login.email,
      "HASH_PASSWORD" : this.login.password
    };
    console.log(data);
    this.create(data).subscribe(success => this.router.navigate(['dashboard']), error =>  this.error = error);
  }

  create(data): Observable<Login> {
    let url = "http://back.dashboard.antmine.io/client/login";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, data, options).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("Login OK")
    return res.json().data || { };
  }

  private handleError (error: Response | any) {
    let errMsg;
    if (error instanceof Response) {
      const body = error.json() || '';
      console.log(body);
      errMsg = body;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
