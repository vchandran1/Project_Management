import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {TaskService} from '../task.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(@Inject(Http) public http,public tascService:TaskService) { }

    // ===========  Pagination  ============
    p: number = 1;

  ngOnInit() {
    this.getTasks()

  }
  // ==========   get Task ========
  Tasks
  getTasks() {
    this.http.get("AddTask/getTask").subscribe(data => {
      this.Tasks = JSON.parse(data._body)
      // console.log(JSON.parse(data._body))
      this.getProject();
      this.getParentTasks();
    })
  }

  // ==========   get Task ========
  ParentTasks
  getParentTasks() {
    this.http.get("AddTask/getParentTask").subscribe(data=>{
      this.ParentTasks=JSON.parse(data._body)
      // console.log(JSON.parse(data._body))
      this.AttachParentTask() ;
    })
  }
  // ==========   get Project  ========
  Projects
  getProject() {
    this.http.get("AddProject/getProjects").subscribe(data => {
      this.Projects = JSON.parse(data._body)
      // console.log(JSON.parse(data._body))
      this.AttachProject()
    })
  }

  AttachProject() {
    this.Tasks.forEach((task, i) => {
      this.Projects.forEach((project, j) => {
        if (task.Project_ID == project._id) {
          this.Tasks[i].ProjectName = project.Project;
        }
      })
    });
    // console.log(this.Tasks)
  }
  AttachParentTask() {
    this.Tasks.forEach((task, i) => {
      this.ParentTasks.forEach((parent, j) => {
        if (task.Parent_ID == parent._id) {
          this.Tasks[i].ParentTask = parent.Parent_Task;
        }else{
          if(task.Parent_ID == ""){
            this.Tasks[i].ParentTask = "This Task Has No Parent"
          }
        }
      })
    });
    // console.log(this.Tasks)
  }

  
  //=============  filters  ===========
  search={ProjectName:''}
  oreder='_id';
  orderBy(order){
    this.oreder=order;
  }

  editTask(task){
    localStorage.setItem("editTask",JSON.stringify(task))
  }

  // =========  End Task  ==============
 
  endTask(id){
    this.http.post("AddTask/EndTask",{_id:id}).subscribe(dt=>{
      // alert(dt._body);
      this.getTasks()

    }) 
  }

}
