import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-income',
  templateUrl: './dashboard-income.component.html',
  styleUrls: ['./dashboard-income.component.css']
})
export class DashboardIncomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Total'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
