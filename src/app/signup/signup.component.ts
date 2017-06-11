import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {RequestOptions, Request, RequestMethod, Headers, Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Client }    from '../models/client';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model = new Client();
  error = null;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.error = null;
    var data = {
      "NAME" : this.model.name,
      "LASTNAME" : this.model.lastname,
      "EMAIL_ADDRESS" : this.model.email,
      "DATE_BIRTHDAY" : this.model.birthday,
      "HASH_PASSWORD" : this.model.password,
      "ADDRESS" : {
        "STREET" : this.model.street,
        "CITY" : this.model.city,
        "ZIP_CODE" : this.model.zip_code,
        "COUNTRY" : this.model.country
      }
    };
    this.create(data).subscribe(success => this.router.navigate(['login']), error =>  console.log(error));
  }

get diagnostic() { return JSON.stringify(this.model); }

create(data): Observable<Client> {
  let url = "http://localhost:3000/client/signup";
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(url, data, options).map(this.extractData).catch(this.handleError);
}

private extractData(res: Response) {
  console.log("Signup OK")
  return res;
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
