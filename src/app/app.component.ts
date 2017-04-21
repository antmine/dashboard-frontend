import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public data;
  loading: boolean = true;

  constructor(private http: Http, private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    this.http.get("https://api.github.com/users/karma151/repos").map(response => response.json()).subscribe((res) =>{
      this.data = res;
    },
    (err) => console.log(err),
    () => {}
  );
}

navigationInterceptor(event: RouterEvent): void {
  if (event instanceof NavigationStart) {
    this.loading = true;
  }
  if (event instanceof NavigationEnd) {
    this.loading = false;
  }
  // Set loading state to false in both of the below events to hide the spinner in case a request fails
  if (event instanceof NavigationCancel) {
    this.loading = false;
  }
  if (event instanceof NavigationError) {
    this.loading = false;
  }
}
}