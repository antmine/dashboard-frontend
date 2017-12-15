import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Component, OnInit, Injectable, ViewChild } from "@angular/core";

export class StatsWraper {
  public site_id
  public site_name

  // Chart information
  public days = 7
  public isDataAvailable = false

  // Data
  public visitors = {data: [], label: "Visiteurs"}
  public miners = {data: [], label: "Mineurs"}
  public averageTime = {data: [], label: "Temps moyen sur le site"}

  // Chart
  public chart:BaseChartDirective
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

	constructor(site_id) {
    this.chart = new BaseChartDirective(ViewChild("chart" + site_id))
  }

  public buildChart(){
    console.log("building chart ...")
    this.lineChartData.push(this.visitors)
    this.lineChartData.push(this.miners)
    this.lineChartData.push(this.averageTime)
    this.isDataAvailable = true

    this.chart.datasets = this.lineChartData
    this.chart.labels = this.lineChartLabels
    this.chart.options = this.lineChartOptions
    this.chart.legend = this.lineChartLegend
    this.chart.chartType = this.lineChartType
  }
}
