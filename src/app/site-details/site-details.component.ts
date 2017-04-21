import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css']
})
export class SiteDetailsComponent implements OnInit {

  public data;
  loading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private http: Http) {}

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
        this.getData(params['owner'], params['id']);
      });
  }

  getData(owner, id){
    this.loading = true;
    console.log("https://api.github.com/repos/" + owner +  "/" + id);
    this.http.get("https://api.github.com/repos/" + owner +  "/" + id).map(response => response.json()).subscribe((res) =>{
      this.data = res;
      this.loading = false;
    },
    (err) => {
      //console.log(err)
    },
    () => {
      //console.log(this.data)
    }
  );
  }
}
