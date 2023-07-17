import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewExamComponent } from './new-exam/new-exam.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { StudentComponent } from './student/student.component';
import { ShowExamComponent } from './show-exam/show-exam.component';

const routes: Routes = [
  {path:'header', component:HeaderComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'new-exam', component:NewExamComponent},
  {path:'subjects', component:SubjectsComponent},
  {path:'students', component:StudentComponent},
  {path:'show-exam/:id', component:ShowExamComponent},
  {path:'**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
