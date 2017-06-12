import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RequestOptions, Request, RequestMethod, Headers, Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: Http, private router: Router) {
    this.logout().subscribe(success => this.router.navigate(['login']), error =>  this.router.navigate(['login']));
}

  ngOnInit() {
  }

  logout(): Observable<JSON> {
    let url = "http://back.dashboard.antmine.io:80/client/logout";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, {}, options).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log(res);
    return res;
  }

  private handleError (error: Response | any) {
    console.log(error);
    return Observable.throw(error);
  }
}
