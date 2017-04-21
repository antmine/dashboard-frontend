import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-browsers',
  templateUrl: './dashboard-browsers.component.html',
  styleUrls: ['./dashboard-browsers.component.css']
})
export class DashboardBrowsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Pie
  public pieChartLabels:string[] = ['Chrome', 'Firefox', 'Safari', 'Edge', 'IE'];
  public pieChartData:number[] = [60, 27, 10, 2, 1];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
