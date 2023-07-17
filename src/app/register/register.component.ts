import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userRegister=new FormGroup({
    userName:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required , Validators.email]),
    password:new FormControl('',Validators.required),
    confirmPassword:new FormControl('',Validators.required)
  })

studentsEmails:any=[];

  constructor(private _service:ServiceService , private router:Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this._service.getStudentRegister('students').subscribe(
      data =>{
        this.studentsEmails=data
        console.log(this.studentsEmails)
      }
    )

  }

  submit()
  {
    const model = {
      userName:this.userRegister.value.userName,
      email:this.userRegister.value.email,
      password:this.userRegister.value.password
    }

    let index = this.studentsEmails.findIndex((item:any) => item.email == this.userRegister.value.email)
    if(index !== -1)
    {
      alert('This account already exists')
    }
    else{
      this._service.studentRegister(model).subscribe(
        data => {
          alert('This account Success')
          this.router.navigate(['/login'])
        }
      )
    }
  }

}
