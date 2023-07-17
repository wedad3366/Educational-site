import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  users:any=[];
  type:string='students';

  usersLogin= this.fb.group({
    type:[this.type],
    email:['',[Validators.required , Validators.email]],
    password:['',Validators.required],
  }) 

  constructor(private _service:ServiceService ,  private fb: FormBuilder , private router:Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getstatus(event:any)
  {
    this.type = event.target.defaultValue
    console.log(this.type)
    this.getUsers()
  }

  getUsers(){
    this._service.getStudentRegister(this.type).subscribe(
      data =>{
        this.users=data
        console.log(this.users)
      }
    )
  }

  submit()
  {
    let index = this.users.findIndex((item:any) => item.email == this.usersLogin.value.email && item.password == this.usersLogin.value.password)
      if(index == -1)
      {
        alert('USER NAME OR PASSWORD INCORRECT')
      }
      else
      {
        const model ={
          userName:this.users[index].userName,
          status:this.type,
          userId:this.users[index].id
        }
        this._service.usersLogin(model).subscribe(
          data => {
            this._service.userLogin.next(data)
            alert('Logged in successfully')
            this.router.navigate(['/subjects'])
            console.log(data)
          }
        )
      } 
  }

}
