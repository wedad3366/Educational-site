import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NewExamComponent } from './new-exam/new-exam.component';
import { RegisterComponent } from './register/register.component';
import { ShowExamComponent } from './show-exam/show-exam.component';
import { StudentComponent } from './student/student.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    NewExamComponent,
    RegisterComponent,
    ShowExamComponent,
    StudentComponent,
    SubjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
