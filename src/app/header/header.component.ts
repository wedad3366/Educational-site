import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _service:ServiceService , private router:Router) { }

  usersLogin:any =null

  ngOnInit(): void {
    this.getUsersLogin();
    this._service.userLogin.subscribe(
      data=>{
        this.usersLogin=data
      }
    )
  }

  getUsersLogin(){
    this._service.getUsersLogin().subscribe(
      data=>{
        this._service.userLogin.next(data)
      }
    )
  }


  logOut(){
    const model={}
    this._service.usersLogin(model).subscribe(
      data=>{
        this._service.userLogin.next(data)
        this.router.navigate(['/login'])
      }
    )
  }

}
