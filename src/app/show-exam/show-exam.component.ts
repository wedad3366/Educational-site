import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-exam',
  templateUrl: './show-exam.component.html',
  styleUrls: ['./show-exam.component.scss']
})
export class ShowExamComponent implements OnInit {

  usersLogin :any=null
  id:any
  exam:any=[]
  subjectName:any=''
  result:boolean=false
  total:number=0
  userData:any
  userSubjects:any=[]
  validExam:boolean=true

  constructor(private _service:ServiceService , public _ActivatedRoute:ActivatedRoute) { 
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id')
  }

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
        this.getDataOfUser()
      }
    )
  }

  getDataOfUser()
  {
    this._service.getStudent(this.usersLogin.userId).subscribe(
      data=>
      {
        this.userData =data
        this.userSubjects = data?.subjects ? data?.subjects : [];
        this.checkValidExam()
      }
    )
  }

  ngAfterViewInit(): void
  {
    this._service.getExam(this.id).subscribe(
      data=>{
        this.exam = data
        this.subjectName = data.subjectName
      }
    )
  }

  deleteOneQues(index:number)
  {
    this.exam.questions.splice(index , 1)
    const model = {
      subjectName : this.subjectName,
      questions: this.exam.questions
    }

    this._service.updatesOnSubject(model , this.id).subscribe(
      data=>{
        alert('success delete')
      }
    )
  }

  getAnswer(event:any)
  { 
    let answer = event.target.value ,
    questionIndex = event.target.name
     this.exam.questions[questionIndex].studentAnswer = answer
  }

  getResult()
  {
    this.total =0
    this.result=true
    for(let x in this.exam.questions)
    {
      if(this.exam.questions[x].studentAnswer == this.exam.questions[x].correctAnswer)
      {
        this.total++
      }
    }
    this.userSubjects.push({
      name:this.subjectName,
      id:this.id,
      grade:this.total
    })
   const model =
   {
    userName :this.userData.userName ,
    email:this.userData.email ,
    password:this.userData.password ,
    subjects:this.userSubjects
   }

   this._service.updateStudent(model , this.usersLogin.userId).subscribe(
    data=>{
    }
   )
  }

  checkValidExam()
  {
    for(let x in this.userSubjects)
    {
      if(this.userSubjects[x].id == this.id)
      {
        this.total = this.userSubjects[x].grade
        this.validExam = false
        alert('You have already examined this subject')
      }
    }
  }

}
