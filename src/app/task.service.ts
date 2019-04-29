import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() { }
  year;months;dates
  startDate(){
    var date=new Date();
    this.year= date.getFullYear();
    this.months=date.getMonth() + 1;
    this.dates=date.getDate();
    if(this.months < 10){
       this.months="0"+this.months
    }
    if(this.dates < 10){
      this.dates="0"+this.dates
    }
    var startDate=this.year+"-"+this.months+"-"+this.dates;
    //console.log(startDate)
    return startDate;
  }
  endDate(startdate){
    var date=new Date(startdate);
    date.setDate(date.getDate()+1)
    this.year= date.getFullYear();
    this.months=date.getMonth() + 1;
    this.dates=date.getDate();
    if(this.months < 10){
      this.months="0"+this.months
    }
    if(this.dates < 10){
      this.dates="0"+this.dates
    }
    var endDate=this.year+"-"+this.months+"-"+this.dates;
    // console.log(endDate)
    return endDate;
  }

}
