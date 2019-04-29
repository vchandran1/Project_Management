import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import {TaskService} from '../task.service'
import { ActivatedRoute } from "@angular/router";
import { Options } from 'ng5-slider';
import {Http} from '@angular/http';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(@Inject(Http) public http,private route: ActivatedRoute,public tascService:TaskService,private router: Router) { }

  disabled=true;startdate;enddate
  ngOnInit() {
    this.getProject();
    this.getUsers();
    this.getParentTask();
    this.startdate=this.tascService.startDate();
    // console.log(this.startdate)
    this.enddate=this.startdate
  }
  // ============ date validations  ===========
  startdatevalidation(){
    // console.log(this.StartDate)
    this.EndDate=''
    this.enddate=this.tascService.endDate(this.StartDate);
  }

  editTask
  editTasks(){
    if(localStorage.getItem("editTask")){
        this.editTask=JSON.parse(localStorage.getItem("editTask"));
        this.searchUser.firstName="";this.Task=this.editTask.Task;this.parentTask=false;this.EndDate=this.editTask.End_Date;this.StartDate=this.editTask.Start_Date;this.search.Project=this.editTask.ProjectName;this.Priority=this.editTask.Priority;
        this.serchParentTask.Parent_Task=this.editTask.ParentTask;this.searchUser.firstName="";
        this.Project_ID=this.editTask.Project_ID;
        this.ParentTask_id=this.editTask.Parent_ID;
        this.updateButton=true;
        this.disabled=false;

        this.users.forEach(element => {
          if(this.editTask.Project_ID==element.projectId && this.editTask._id==element.taskId){
            this.User_id=element._id;
            this.searchUser.firstName=element.firstName;
          }
        });
    }
  }

  Priority: number = 0;
  options: Options = {
    floor: 0,
    ceil: 30
  };

  Projects;updateButton=false;
  getProject(){
    this.http.get("AddProject/getProjects").subscribe(data=>{
      this.Projects=JSON.parse(data._body)
      // console.log(JSON.parse(data._body))
    })
  }

  showprojectlist=false
  showProjectList(){
    this.showprojectlist=true;
  }
  search={Project:''};Project_ID;
  attachProjectName(name,id){
    this.search.Project=name;
    this.Project_ID=id;
    this.showprojectlist=false
  }

  parentTask=false;ParentTask;Task;
  parentTaskCheck(){
    //alert(this.Task)
    if(this.parentTask == true){
      this.ParentTask="";
    }else{
      //alert(this.Task)
      this.serchParentTask.Parent_Task=this.Task
    }
  }

    //=============    get users data   ===============
    users;
    getUsers(){
      this.http.get("AddUser/getUsers").subscribe(data=>{
        this.users=JSON.parse(data._body)
        // console.log(JSON.parse(data._body))
        this.editTasks()
      })
    }

    //===========  search user   =============    
    searchUser={firstName:''};User_id;

    showuserlist=false
    showUserList(){
      this.showuserlist=true;
    }

    attachUserName(name,id){
      this.searchUser.firstName=name;
      this.User_id=id
      this.showuserlist=false
    }

    // ==========   get Parent Task ========
    parentTasks
    getParentTask(){
      this.http.get("AddTask/getParentTask").subscribe(data=>{
        this.parentTasks=JSON.parse(data._body)
        // console.log(JSON.parse(data._body))
      })
    }
        //===========  search user   =============    
        serchParentTask={Parent_Task:''};ParentTask_id='';

        showParentTasklist=false
        showParentTaskList(){
          this.showParentTasklist=true;
        }
        attachParentTask(name,id){
          this.serchParentTask.Parent_Task=name;
          this.ParentTask_id=id;
          this.showParentTasklist=false
        }

    // ==========  Add Task  =============
    StartDate;EndDate
    addTask(formvalidation){
      var task={
        parentTask:this.parentTask,
        Project_ID:this.Project_ID,
        Task:this.Task,
        Start_Date:this.StartDate,
        End_Date:this.EndDate,
        Priority:this.Priority,
        User_id:this.User_id,
        parent_ID:this.ParentTask_id
      }
          // console.log(task)
    if(formvalidation.form.controls.EndDate.status=="VALID" && 
    formvalidation.form.controls.StartDate.status=="VALID"){
      this.http.post("AddTask/addTask",task).subscribe(dt=>{
        // alert(dt._body);
        this.searchUser.firstName="";this.Task="";this.parentTask=false;this.EndDate="";this.StartDate="";this.search.Project="";this.Priority=0;
        this.serchParentTask.Parent_Task="";this.searchUser.firstName="";
      }) 
    }else{
      alert("Enter valid Details")
    }
    }

    // ============  update  ==========
    saveUpdateTask(formvalidation){
      var task={
        _id:this.editTask._id,
        Task:this.Task,
        Start_Date:this.StartDate,
        End_Date:this.EndDate,
        Priority:this.Priority,
        parent_ID:this.ParentTask_id
      }
          console.log(task)
    if(formvalidation.form.controls.EndDate.status=="VALID" && 
    formvalidation.form.controls.StartDate.status=="VALID"){
      this.http.post("AddTask/UpdateTask",task).subscribe(dt=>{
        // alert(dt._body);
        this.cnacel()
        this.router.navigateByUrl('/viewTask');
      }) 
    }else{
      alert("Enter valid Details")
    }
    }

    // ============  reset  ===========
    reset(){
      this.searchUser.firstName="";this.Task="";this.parentTask=false;this.EndDate="";this.StartDate="";this.search.Project="";this.Priority=0;
      this.serchParentTask.Parent_Task="";this.searchUser.firstName="";
    }

    //============ cnacel   ===========
    cnacel(){
      localStorage.removeItem("editTask")
      this.reset()
    }

}
