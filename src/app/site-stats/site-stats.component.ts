import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { LoaderService } from "../service/loader.service";
import { Chart } from "../models/chart-data";

@Component({
  selector: 'app-site-stats',
  templateUrl: './site-stats.component.html',
  styleUrls: ['./site-stats.component.css']
})
export class SiteStatsComponent implements OnInit {
  @Input() site_id: string;
  @ViewChild(BaseChartDirective) private chart: BaseChartDirective

  public days_options = [
    {value: '7', viewValue: '7 jours'},
    {value: '14', viewValue: '14 jours'},
    {value: '31', viewValue: '1 mois'}
  ];

  public days = 7

  public site_data

  public country_ranking_available = false;
  public country_ranking: Chart

  private visitors = { data: [], label: "Visiteurs" }
  private miners = { data: [], label: "Mineurs" }
  private averageTime = { data: [], label: "Temps moyen sur le site" }

  public isDataAvailable = false

  public lineChartLabels:Array<any> = [];
  public lineChartData = [];
  public lineChartOptions:any = {
    responsive: true,
    animation : false
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private http: Http, private loaderService: LoaderService) {
  }

  ngOnInit() {
    console.log(this.site_id)
    this.getStats()
  }

  public onChange(){
    //this.isDataAvailable = false
    console.log(this.days)
    console.log("Get stats for " + this.days + " days")
    this.getStats()
    this.chart.chart.update()
  }

  init(){
    this.visitors = { data: [], label: "Visiteurs" }
    this.miners = { data: [], label: "Mineurs" }
    this.averageTime = { data: [], label: "Temps moyen sur le site" }
    this.lineChartLabels = []
  }

  getStats(){
    setTimeout(() =>
    this.loaderService.displayLoader(true)
  )

  this.init()
  let url = "http://back.dashboard.antmine.io/stats/" + this.site_id + "/" + this.days;
  let headers = new Headers({ "Content-Type": "application/json" });
  let options = new RequestOptions({
    headers: headers,
    withCredentials: true
  });

  this.http
  .get(url, options)
  .map(res => res.text())
  .subscribe(
    data => {
      let tmp_array = JSON.parse(data)

      this.site_data = tmp_array
      this.isDataAvailable = true
      this.loaderService.displayLoader(false);

      this.country_ranking = new Chart
      this.country_ranking.label = "Country Ranking"
      this.site_data.COUNTRY_RANKINGs.forEach((obj, index) => {
        this.country_ranking.data.push(obj.NB_VISITOR_SUM)
        this.country_ranking.labels.push(obj.COUNTRY)
      })
      this.country_ranking_available = true



      // OLD CODE
      console.log(this.site_data.VISITORS_WEBSITEs)
        this.site_data.VISITORS_WEBSITEs.forEach((obj, index) => {
          console.log(obj)
          this.visitors.data.push(obj.NB_VISITOR)
          this.miners.data.push(obj.NB_MINER)
          this.averageTime.data.push(obj.AVERAGE_TIME)

          let date = new Date(obj.DATE_EVENT)
          this.lineChartLabels.push(date.getUTCDate() + "/" + date.getMonth() + "/" + date.getFullYear())
        })
        this.lineChartData = [
          this.visitors,
          this.miners,
          this.averageTime
        ]
      this.isDataAvailable = true
      this.loaderService.displayLoader(false);
      console.log("loading successful")
    },
    err => {
      this.loaderService.displayLoader(false);
    }
  );
}
}
