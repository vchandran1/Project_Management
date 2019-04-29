import { Component, OnInit, Inject } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(@Inject(Http) public http) { }
  // ===========  Pagination  ============
  p: number = 1;

  disabled=false;
  ngOnInit() {
    this.getUsers();
  }
  // ==========  filters  =========
  oreder='firstName';search=''
  orderBy(order){
    this.oreder=order;
  }
  // ========== end filters  =========

  temp=0;e_firstName;e_lastName;e_empId;
  editUserData(user){
    this.temp=user._id
    this.e_firstName=user.firstName;
    this.e_lastName=user.lastName;
    this.e_empId=user.empId;
    this.disabled=true;
  }
  // ==============  update user data  ==============
  saveUserData(user){
    var updateUser={
      _id:user._id,
      firstName:this.e_firstName,
      lastName:this.e_lastName,
      empId:this.e_empId,
      projectId:user.projectId,
      taskId: user.taskId
    };
    // console.log(user)
    // console.log(updateUser)
    this.http.post("AddUser/update",[user,updateUser]).subscribe(dt=>{
      // alert(dt._body)
      this.temp=0;
      this.disabled=false;
      this.getUsers();
    })
  }
  cancelUserData(){
    this.temp=0;
    this.disabled=false;
  }
  firstName;
  lastName;
  empId;
  errorValidation=false;
  addUser(formvalidation){
    if(formvalidation.valid){
      this.http.post("AddUser/addUser",{firstName:this.firstName,lastName:this.lastName,empId:this.empId}).subscribe(dt=>{
        // alert(dt._body);
        this.getUsers();
        this.firstName='';
        this.lastName='';
        this.empId='';
      }) 
    }else{
      this.errorValidation=true;
    }
  }
  reset(){
    this.firstName='';
    this.lastName='';
    this.empId='';
  }

  //=============    get users data   ===============
  users;
  getUsers(){
    this.http.get("AddUser/getUsers").subscribe(data=>{
      this.users=JSON.parse(data._body)
      // console.log(JSON.parse(data._body))
    })
  }

  // ===============  delete user   ================
  deleteUser(user){
    this.http.post("AddUser/deletUser",{_id:user._id}).subscribe(dt=>{
      // alert(dt._body)
      this.getUsers();
    })
  }

}
