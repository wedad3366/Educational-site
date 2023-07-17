import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http:HttpClient) { }

  userLogin =new Subject()

  studentRegister(model:any) : Observable<any> {

    return this._http.post('http://localhost:3000/students', model);
  }

  usersLogin(model:any) : Observable<any> {

    return this._http.put('http://localhost:3000/login/1', model);
  }

  getStudentRegister(type:string) : Observable<any> {

    return this._http.get('http://localhost:3000/'+type);
  }

  
  getUsersLogin() : Observable<any> {

    return this._http.get('http://localhost:3000/login/1');
  }

  createSubjectQuestion(model:any) : Observable<any> 
  {
    return this._http.post('http://localhost:3000/subjects', model);
  }

  updatesOnSubject(model:any , id:number) : Observable<any> 
  {
    return this._http.put('http://localhost:3000/subjects/'+id , model);
  }

  deleteSubject(id:number) : Observable<any> 
  {
    return this._http.delete('http://localhost:3000/subjects/'+id);
  }

  getAllSubjects(): Observable<any> {

    return this._http.get('http://localhost:3000/subjects');
  }

  getExam(id:any): Observable<any> {

    return this._http.get('http://localhost:3000/subjects/'+id);
  }

  getStudent(id:any): Observable<any> {

    return this._http.get('http://localhost:3000/students/'+id);
  }

  updateStudent(model:any , id:number) : Observable<any> 
  {
    return this._http.put('http://localhost:3000/students/'+id , model);
  }
}
