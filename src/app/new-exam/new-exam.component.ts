import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl ,Validators , FormBuilder} from '@angular/forms';
import { ServiceService } from '../service.service';



@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  subjectName =new FormControl();
  correctNumQues:any
  allQuestion:any=[]
  createQuestion!:FormGroup
  id:any
  showButtonSave:boolean=false
  showButtonFinsh:boolean=false
  showButtonAdd:boolean=false
  showButtonEdit:boolean=false
  showButtonSaveEdit:boolean=false
 

  createForm()
  {
    this.createQuestion= this.fb.group(
      {
        id:['',Validators.required],
        question:['',Validators.required],
        answer1:['',Validators.required],
        answer2:['',Validators.required],
        answer3:['',Validators.required],
        answer4:['',Validators.required],
      }
    )
  }

  constructor(private fb:FormBuilder , private _service:ServiceService) {
   }

  ngOnInit(): void {
    this.createForm()
  }

  showPartOne()
  {
    this.subjectName.reset()
    if( $('.part-one').css("display")=="none")
    {
      $('.part-one').css("display","block");
      $('.part-three').css("display","none");
      $('.part-two').css("display","none");
    }
  }

  showPartTwo(){
    if(this.subjectName.value == null)
    {
      alert("please Enter the name of the Subject")
    }
    else
    {
      if( $('.part-two').css("display")=="none")
      {
        $('.part-two').css("display","block");
        $('.part-one').css("display","none");
        $('.part-three').css("display","none");
      }
    }
  }

  showPartThree(){
    if( $('.part-three').css("display")=="none"){
      $('.part-three').css("display","block");
      $('.part-one').css("display","none");
    $('.part-two').css("display","none");
  }
  }

  getCorrectAnswer(event:any)
  {
    this.correctNumQues=event.target.value
  }


  createNewQuestion()
  {
    if(this.correctNumQues) 
    {
      const model={
        id:this.createQuestion.value.id,
        question:this.createQuestion.value.question,
        answer1:this.createQuestion.value.answer1,
        answer2:this.createQuestion.value.answer2,
        answer3:this.createQuestion.value.answer3,
        answer4:this.createQuestion.value.answer4,
        correctAnswer:this.createQuestion.value[this.correctNumQues]
      }

      this.allQuestion.push(model)
      this.createQuestion.reset()
    }
    else{
      alert('please choose your correct answer')
    }
  }

  deleteExam(){
    this.allQuestion = [];
    this.createQuestion.reset();
    this.subjectName.reset();
    if( $('.part-one').css("display")=="none")
    {
      $('.part-one').css("display","block");
      $('.part-three').css("display","none");
      $('.part-two').css("display","none");
    }
    this._service.deleteSubject(this.id).subscribe(
      data=>{
        alert('This Exam Is Deleted')
        }
    )
    this.showButtonFinsh = false 
    this.showButtonAdd = false
    this.showButtonEdit=false
    this.showButtonSave=false
    this.showButtonSaveEdit = false

  }

  deletOneQuestion(index:number)
  {
    this.allQuestion.splice(index , 1)
    const model = {
      subjectName : this.subjectName.value,
      questions: this.allQuestion
    }

    this._service.updatesOnSubject(model , this.id).subscribe(
      data=>{
        alert('success delete')
      }
    )
  }

  updateOneQuestion(item:any){
    this.showButtonSave=true
    this.showButtonSaveEdit = true
    this.showButtonFinsh= true
    this.showButtonEdit=true

    if( $('.part-two').css("display")=="none")
    {
      $('.part-two').css("display","block");
      $('.part-one').css("display","none");
      $('.part-three').css("display","none");
    }
    //this.createQuestion.get('question')?.setValue(index.question)
    //this.createQuestion.get('answer1')?.setValue(index.answer1)
    //this.createQuestion.get('answer2')?.setValue(index.answer2)
    //this.createQuestion.get('answer3')?.setValue(index.answer3)
    //this.createQuestion.get('answer4')?.setValue(index.answer4)
    this.createQuestion.patchValue(
      {
        id:item.id,
        question:item.question,
        answer1:item.answer1,
        answer2:item.answer2,
        answer3:item.answer3,
        answer4:item.answer4,
      }
    )
  }

  saveEdit(data:any){
    var newArray = {
        id:this.allQuestion.id = data.value.id,
        question:this.allQuestion.question = data.value.question,
        answer1:this.allQuestion.answer1 = data.value.answer1,
        answer2:this.allQuestion.answer2 = data.value.answer2,
        answer3:this.allQuestion.answer3 = data.value.answer3,
        answer4:this.allQuestion.answer4 = data.value.answer4,
        correctAnswer:this.allQuestion.correctAnswer = data.value[this.correctNumQues]
    }
    this.allQuestion = this.allQuestion.map((item:any) => item.id !== newArray.id ? item : newArray);

    const model ={
      subjectName : this.subjectName.value,
      questions : this.allQuestion 
    }
    
    console.log(model)

    this._service.updatesOnSubject(model, this.id).subscribe(
      data=>{
        alert('success Edit')
        this.showPartThree()
      }
    )
  }

  submit()
  {
    const model ={
      subjectName : this.subjectName.value,
      questions: this.allQuestion
    }

    this._service.createSubjectQuestion(model).subscribe(
      data=>{
        console.log(data)
        this.showPartThree()
        this.id= data.id
      }
    )
  }

  back()
  {
    this.showButtonFinsh = true 
    this.showButtonAdd = true
    this.showButtonEdit=true
    this.showButtonSave=true
    this.showButtonSaveEdit = false
  
    this.createQuestion.reset()
    if( $('.part-two').css("display")=="none")
    {
      $('.part-two').css("display","block");
      $('.part-one').css("display","none");
      $('.part-three').css("display","none");
    }
  }

  addNewQuestionInExam()
  { 
      var newArray =
      {
        id:this.createQuestion.value.id,
        question:this.createQuestion.value.question,
        answer1:this.createQuestion.value.answer1,
        answer2:this.createQuestion.value.answer2,
        answer3:this.createQuestion.value.answer3,
        answer4:this.createQuestion.value.answer4,
        correctAnswer:this.createQuestion.value[this.correctNumQues]
      }
      if (newArray.id !== null && newArray.question !== null)
      {
        this.allQuestion.push(newArray) 
        const model={
          subjectName : this.subjectName.value,
          questions : this.allQuestion 
        }
        this.createQuestion.reset()
        this._service.updatesOnSubject(model, this.id).subscribe(
          data=>{
            alert('success Add')
            this.showPartThree()
          }
        )
      }
      else{ 
        alert('No Exist New Question to Add')
        this.showPartThree()
      }

  }

  anotherExam()
  {
    this.showPartOne()
    this.allQuestion = [];
    this.showButtonFinsh = false 
    this.showButtonAdd = false
    this.showButtonEdit=false
    this.showButtonSave=false
    this.showButtonSaveEdit = false
  }

}
