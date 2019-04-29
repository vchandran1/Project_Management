import { Component, OnInit,Inject } from '@angular/core';
import {TaskService} from '../task.service'
import { Options } from 'ng5-slider';
import {Http} from '@angular/http';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(@Inject(Http) public http,public tascService:TaskService) { }
  // ===========  Pagination  ============
  p: number = 1;

  search={Project:''}

  //========= set start date and end date========
  setDates=false;

    // ============ date validations  ===========
    startdate;enddate
    startdatevalidation(){
      // console.log(this.StartDate)
      this.EndDate=''
      this.enddate=this.tascService.endDate(this.StartDate);
    }

  ngOnInit() {
    this.getProject()
    this.startdate=this.tascService.startDate();
    // console.log(this.startdate)
    this.enddate=this.startdate
  }
  Priority: number = 0;
  options: Options = {
    floor: 0,
    ceil: 30
  };
  inputStartDate='input-date dateclass placeholderclass'
  inputStart(){
    if(this.inputStartDate==='input-date dateclass'){
      this.inputStartDate='input-date dateclass placeholderclass'
    }else{
      this.inputStartDate='input-date dateclass'
    }
    
  }
  inputEndDate='input-date dateclass placeholderclass'
  inputEnd(){
    if(this.inputEndDate==='input-date dateclass'){
      this.inputEndDate='input-date dateclass placeholderclass'
    }else{
      this.inputEndDate='input-date dateclass'
    }
  }

  Project;StartDate;EndDate;manager
  addProject(formvalidation){
    // console.log(formvalidation)
    if(formvalidation.form.controls.EndDate.status=="VALID" && 
    formvalidation.form.controls.Project.status=="VALID"&&
    formvalidation.form.controls.StartDate.status=="VALID"){
      this.http.post("AddProject/addProject",{Project:this.Project,StartDate:this.StartDate,EndDate:this.EndDate,Priority:this.Priority}).subscribe(dt=>{
        // alert(dt._body);
        this.Project="";this.EndDate="";this.StartDate="";this.manager="";this.Priority=0;
        this.getProject();
        this.inputStart();
        this.inputEnd();
      }) 
    }else{
      alert("Enter valid Details")
    }
  }
  // ========== get Projects =============
  Projects
  getProject(){
    this.http.get("AddProject/getProjects").subscribe(data=>{
      this.Projects=JSON.parse(data._body)
      // console.log(JSON.parse(data._body))
      this.getTasks()
    })
  }

    // ==========   get Task ========
    Tasks
    getTasks() {
      this.http.get("AddTask/getTask").subscribe(data => {
        this.Tasks = JSON.parse(data._body)
        // console.log(JSON.parse(data._body))
        this.AttachNoOfTasks();
      })
    }
    // ========= attach no of tasks  =======
    AttachNoOfTasks() {
      this.Projects.forEach((project, i) => {
        var noOfTasks=0;var CompletedTasks=0;
        this.Tasks.forEach((task, j) => {
          if (project._id == task.Project_ID) {
            noOfTasks ++;
            if(task.Status=="Completed"){
              CompletedTasks ++;
            }
          }
        })
        this.Projects[i].NoOfTasks=noOfTasks;
        this.Projects[i].CompletedTasks=CompletedTasks;
      });
      // console.log(this.Projects)
    }

  //===========  update button  ============
  updateButton=false;oldProjectDate
  updateProject(project){
    this.oldProjectDate=project;
    this.updateButton=true;
    this.Project=project.Project;
    this.Priority=project.Priority;
    this.StartDate=project.StartDate;
    this.EndDate=project.EndDate;
    this.inputStart();
    this.inputEnd();

  }
// ===========  save update project ======
  saveUpdateProject(formvalidation){
    if(formvalidation.form.controls.EndDate.status=="VALID" && 
    formvalidation.form.controls.Project.status=="VALID"&&
    formvalidation.form.controls.StartDate.status=="VALID"){
      var newProjectDate={Project:this.Project,StartDate:this.StartDate,EndDate:this.EndDate,Priority:this.Priority}
      this.http.post("AddProject/updateProject",[this.oldProjectDate,newProjectDate]).subscribe(dt=>{
        // alert(dt._body);
        this.Project="";this.EndDate="";this.StartDate="";this.manager="";this.Priority=0;
        this.getProject();
        this.inputStart();
        this.inputEnd();
      }) 
    }else{
      alert("Enter valid Details")
    }
  }

  // ==========  Reset  ===============
  reset(){
    this.Project='';
    this.StartDate='';
    this.EndDate='';
    this.Priority=0;
    this.manager='';
    this.inputStart();
    this.inputEnd();
  }

  // ============  cancel  ============
  cnacel(){
    this.reset();
    this.updateButton=false
  }

  //=============  filters  ===========
  oreder='Project';
  orderBy(order){
    this.oreder=order;
  }
}
