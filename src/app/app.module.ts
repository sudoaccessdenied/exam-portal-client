import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthService } from './shared/auth/auth.service';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponentComponent } from './home/page-not-found-component.component';
import { CourseSelectComponent } from './course/course-select.component';
import { InterceptorService } from './shared/auth/interceptor.service';
import { QuestionsModule } from './questions/questions.module';
import { AdminModule } from './admin/admin.module';
// import { QuestionsComponent } from './questions/questions.component';
// import { AuthGuardService } from './shared/auth/auth-guard.service';


// material imports
// import { RegistrationComponent } from './registration/registration.component'
// import { LoginComponent } from './login/login.component';

// registration and login module imports 





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponentComponent,
    CourseSelectComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,// this module has child routes check for any error with routes
    QuestionsModule,// this module has child routes check for any error with routes
    AppRoutingModule,//this import routing module
    SharedModule,
    LoginModule,
    RegistrationModule,
    HttpClientModule
    ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
}

)
export class AppModule { }
