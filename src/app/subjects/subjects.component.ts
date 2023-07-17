import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  constructor(private _service:ServiceService ) { }
  usersLogin:any =null
  allSubjects:any=[]

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

  ngAfterViewInit(): void
  {
    this._service.getAllSubjects().subscribe(
      data=>{
        this.allSubjects=data
      }
    )
  }

  deleteExam(index:any)
  {
    let id = this.allSubjects[index].id
    this.allSubjects.splice(index , 1)
    this._service.deleteSubject(id).subscribe(
      data=>{
        alert('This Exam Is Deleted')
      }
    )
  }


}
