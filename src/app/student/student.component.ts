import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  dataSource:any
  dataTable:any
  constructor(private _service:ServiceService) { }

  ngOnInit(): void {
    this.getStudent()
  }

 getStudent(){  

    this._service.getStudentRegister('students').subscribe(
    data=>{
    this.dataSource = data?.map((student:any)=> // map ==> y3ni fe new array htrg3 (all)
     {
      if(student?.subjects)
      {
        return student?.subjects?.map((subject:any)=> // hna d5lt gwa array tnya (subject)
        {
          return {
            name:student.userName,
            subjectName:subject.name,
            grade:subject.grade
          }
        }
        )
      }
      else{
        return [
          {
            name:student.userName,
            subjectName:"-",
            grade:"-"
          }
        ]
      }
     })
     this.dataTable=[];
     this.dataSource.forEach((item:any)=> // hna ana d5lt 3la first item
     {
      // h3ml foor loop tnya tmshy 3la al for loop el ola w t5ls yd5ol 3la ely b3doo w ya5d el subjects ely feha
      item.forEach((subjectItem:any)=>
      {
        this.dataTable.push(
          {
            name:subjectItem.name,
            subjectName:subjectItem.subjectName,
            grade:subjectItem.grade
          }
        )
      })  
     })
     console.log(this.dataTable)
    })

  }

}
