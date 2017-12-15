import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-site-stats',
  templateUrl: './site-stats.component.html',
  styleUrls: ['./site-stats.component.css']
})
export class SiteStatsComponent implements OnInit {
  @Input() site_id: string;
  @ViewChild(BaseChartDirective) private chart: BaseChartDirective

  private visitors = { data: [], label: "Visiteurs" }
  private miners = { data: [], label: "Mineurs" }
  private averageTime = { data: [], label: "Temps moyen sur le site" }

  public days = 7
  public isDataAvailable = false

  public lineChartLabels:Array<any> = [];
  public lineChartData = [];
  public lineChartOptions:any = {
    responsive: true,
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private http: Http) {
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
        tmp_array.forEach((obj, index) => {
          this.visitors.data.push(obj.NB_VISITOR)
          this.miners.data.push(obj.NB_MINER)
          this.averageTime.data.push(obj.AVERAGE_TIME)

          let date = new Date(obj.DATE)
          this.lineChartLabels.push(date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear())
        })
        this.lineChartData = []
        this.lineChartData.push(this.visitors)
        this.lineChartData.push(this.miners)
        this.lineChartData.push(this.averageTime)
        this.isDataAvailable = true
      },
      err => {}
    );
  }
}
